// backend/src/repositories/vehiculo.repository.js
const { pool: db } = require('../config/database');

let imageColumnsSupportCache = null;

async function supportsImageColumns() {
    if (imageColumnsSupportCache !== null) {
        return imageColumnsSupportCache;
    }

    const query = `
        SELECT COUNT(*)::int AS count
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'vehiculos'
          AND column_name IN ('imagen', 'imagen_mime_type');
    `;

    const { rows } = await db.query(query);
    imageColumnsSupportCache = rows[0]?.count === 2;
    return imageColumnsSupportCache;
}

function parseImageDataUrl(dataUrl) {
    const matches = /^data:(image\/[a-zA-Z0-9.+-]+);base64,([A-Za-z0-9+/=\s]+)$/.exec(dataUrl || '');
    if (!matches) {
        return { buffer: null, mimeType: null };
    }

    const mimeType = matches[1];
    const base64Content = matches[2].replace(/\s/g, '');
    return {
        buffer: Buffer.from(base64Content, 'base64'),
        mimeType,
    };
}

function normalizeFechaMatricula(value) {
    if (value instanceof Date) {
        return value.toISOString().split('T')[0];
    }

    if (typeof value === 'string') {
        const parsed = new Date(value);
        if (!Number.isNaN(parsed.getTime())) {
            return parsed.toISOString().split('T')[0];
        }
    }

    return value;
}

function mapVehiculoRow(row, options = {}) {
    if (!row) {
        return null;
    }

    const includeImage = options.includeImage !== false;
    const hasImage = typeof row.tiene_imagen === 'boolean' ? row.tiene_imagen : !!row.imagen;
    const mimeType = row.imagen_mime_type || 'image/jpeg';
    const imageData = includeImage && hasImage && row.imagen ? row.imagen.toString('base64') : null;

    return {
        ...row,
        fecha_matricula: normalizeFechaMatricula(row.fecha_matricula),
        imagen: imageData ? `data:${mimeType};base64,${imageData}` : null,
        tiene_imagen: hasImage,
    };
}

const VehiculoRepository = {
    // Crear un nuevo vehículo vinculándolo a un propietario existente
    create: async (datos) => {
        const { placa, marca, fecha_matricula, tipo_vehiculo, propietario_id, imagen } = datos;
        const hasImageColumns = await supportsImageColumns();

        let query;
        let values;

        if (hasImageColumns) {
            const parsedImage = parseImageDataUrl(imagen);
            query = `
                INSERT INTO vehiculos (placa, marca, fecha_matricula, tipo_vehiculo, propietario_id, imagen, imagen_mime_type)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *;
            `;
            values = [placa, marca, fecha_matricula, tipo_vehiculo, propietario_id, parsedImage.buffer, parsedImage.mimeType];
        } else {
            query = `
                INSERT INTO vehiculos (placa, marca, fecha_matricula, tipo_vehiculo, propietario_id)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *;
            `;
            values = [placa, marca, fecha_matricula, tipo_vehiculo, propietario_id];
        }

        const { rows } = await db.query(query, values);
        return mapVehiculoRow(rows[0], { includeImage: hasImageColumns });
    },

    // Buscar un vehículo por su placa (usando el índice idx_vehiculos_propietario_id)
    findByPlaca: async (placa) => {
        const hasImageColumns = await supportsImageColumns();
        const query = hasImageColumns
            ? 'SELECT * FROM vehiculos WHERE placa = $1;'
            : 'SELECT id_vehiculo, placa, marca, fecha_matricula, tipo_vehiculo, propietario_id FROM vehiculos WHERE placa = $1;';
        const { rows } = await db.query(query, [placa]);
        return mapVehiculoRow(rows[0], { includeImage: hasImageColumns });
    },

    findById: async (id) => {
        const hasImageColumns = await supportsImageColumns();
        const query = hasImageColumns
            ? 'SELECT * FROM vehiculos WHERE id_vehiculo = $1;'
            : 'SELECT id_vehiculo, placa, marca, fecha_matricula, tipo_vehiculo, propietario_id FROM vehiculos WHERE id_vehiculo = $1;';
        const { rows } = await db.query(query, [id]);
        return mapVehiculoRow(rows[0], { includeImage: hasImageColumns });
    },

    // Obtener todos los vehículos con el nombre de su dueño (JOIN)
    findAll: async () => {
        const hasImageColumns = await supportsImageColumns();
        const query = hasImageColumns
            ? `
                SELECT
                    id_vehiculo,
                    placa,
                    marca,
                    fecha_matricula,
                    tipo_vehiculo,
                    propietario_id,
                    imagen,
                    imagen_mime_type,
                    (imagen IS NOT NULL) AS tiene_imagen
                FROM vehiculos;
            `
            : `
                SELECT
                    id_vehiculo,
                    placa,
                    marca,
                    fecha_matricula,
                    tipo_vehiculo,
                    propietario_id,
                    FALSE AS tiene_imagen
                FROM vehiculos;
            `;
        const { rows } = await db.query(query);
        return rows.map((row) => mapVehiculoRow(row, { includeImage: hasImageColumns }));
    },

    update: async (id, datos) => {
        const { marca, fecha_matricula, tipo_vehiculo, propietario_id, imagen } = datos;
        const hasImageColumns = await supportsImageColumns();

        let query;
        let values;

        if (hasImageColumns) {
            const parsedImage = parseImageDataUrl(imagen);
            const shouldUpdateImage = typeof imagen === 'string' && imagen.trim() !== '';
            query = `
                UPDATE vehiculos
                SET marca = $1,
                    fecha_matricula = $2,
                    tipo_vehiculo = $3,
                    propietario_id = $4,
                    imagen = CASE WHEN $5::boolean THEN $6::bytea ELSE imagen END,
                    imagen_mime_type = CASE WHEN $5::boolean THEN $7::varchar ELSE imagen_mime_type END
                WHERE id_vehiculo = $8
                RETURNING *;
            `;
            values = [marca, fecha_matricula, tipo_vehiculo, propietario_id, shouldUpdateImage, parsedImage.buffer, parsedImage.mimeType, id];
        } else {
            query = `
                UPDATE vehiculos
                SET marca = $1,
                    fecha_matricula = $2,
                    tipo_vehiculo = $3,
                    propietario_id = $4
                WHERE id_vehiculo = $5
                RETURNING *;
            `;
            values = [marca, fecha_matricula, tipo_vehiculo, propietario_id, id];
        }

        const { rows } = await db.query(query, values);
        return mapVehiculoRow(rows[0], { includeImage: hasImageColumns });
    },

    updateImage: async (id, imagen) => {
        const hasImageColumns = await supportsImageColumns();
        if (!hasImageColumns) {
            throw new Error('La base de datos no soporta almacenamiento de imagenes para vehiculos.');
        }

        const parsedImage = parseImageDataUrl(imagen);
        const query = `
            UPDATE vehiculos
            SET imagen = $1, imagen_mime_type = $2
            WHERE id_vehiculo = $3
            RETURNING *;
        `;
        const { rows } = await db.query(query, [parsedImage.buffer, parsedImage.mimeType, id]);
        return mapVehiculoRow(rows[0]);
    },

    removeImage: async (id) => {
        const hasImageColumns = await supportsImageColumns();
        if (!hasImageColumns) {
            throw new Error('La base de datos no soporta almacenamiento de imagenes para vehiculos.');
        }

        const query = `
            UPDATE vehiculos
            SET imagen = NULL, imagen_mime_type = NULL
            WHERE id_vehiculo = $1
            RETURNING *;
        `;
        const { rows } = await db.query(query, [id]);
        return mapVehiculoRow(rows[0]);
    },

    delete: async (id) => {
        const query = 'DELETE FROM vehiculos WHERE id_vehiculo = $1 RETURNING *;';
        const { rows } = await db.query(query, [id]);
        return mapVehiculoRow(rows[0]); // Retorna el registro eliminado para confirmar
    }

    

};

module.exports = VehiculoRepository;