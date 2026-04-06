// backend/src/repositories/vehiculo.repository.js
const { pool: db } = require('../config/database');

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

function mapVehiculoRow(row) {
    if (!row) {
        return null;
    }

    const hasImage = !!row.imagen;
    const mimeType = row.imagen_mime_type || 'image/jpeg';
    const imageData = hasImage ? row.imagen.toString('base64') : null;

    return {
        ...row,
        imagen: hasImage ? `data:${mimeType};base64,${imageData}` : null,
        tiene_imagen: hasImage,
    };
}

const VehiculoRepository = {
    // Crear un nuevo vehículo vinculándolo a un propietario existente
    create: async (datos) => {
        const { placa, marca, fecha_matricula, tipo_vehiculo, propietario_id, imagen } = datos;
        const parsedImage = parseImageDataUrl(imagen);
        const query = `
            INSERT INTO vehiculos (placa, marca, fecha_matricula, tipo_vehiculo, propietario_id, imagen, imagen_mime_type)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;
        const values = [placa, marca, fecha_matricula, tipo_vehiculo, propietario_id, parsedImage.buffer, parsedImage.mimeType];
        const { rows } = await db.query(query, values);
        return mapVehiculoRow(rows[0]);
    },

    // Buscar un vehículo por su placa (usando el índice idx_vehiculos_propietario_id)
    findByPlaca: async (placa) => {
        const query = 'SELECT * FROM vehiculos WHERE placa = $1;';
        const { rows } = await db.query(query, [placa]);
        return mapVehiculoRow(rows[0]);
    },

    findById: async (id) => {
        const query = 'SELECT * FROM vehiculos WHERE id_vehiculo = $1;';
        const { rows } = await db.query(query, [id]);
        return mapVehiculoRow(rows[0]);
    },

    // Obtener todos los vehículos con el nombre de su dueño (JOIN)
    findAll: async () => {
        // Quitamos el JOIN. Solo necesitamos los datos base del vehículo.
        // El resolver de campo se encargará de buscar al dueño por aparte.
        const query = 'SELECT * FROM vehiculos;'; 
        const { rows } = await db.query(query);
        return rows.map(mapVehiculoRow);
    },

    update: async (id, datos) => {
        const { marca, fecha_matricula, tipo_vehiculo, propietario_id, imagen } = datos;
        const parsedImage = parseImageDataUrl(imagen);
        const shouldUpdateImage = typeof imagen === 'string' && imagen.trim() !== '';
        const query = `
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
        const values = [marca, fecha_matricula, tipo_vehiculo, propietario_id, shouldUpdateImage, parsedImage.buffer, parsedImage.mimeType, id];
        const { rows } = await db.query(query, values);
        return mapVehiculoRow(rows[0]); // Retorna el vehículo actualizado
    },

    updateImage: async (id, imagen) => {
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