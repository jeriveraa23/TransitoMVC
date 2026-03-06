// backend/src/repositories/infraccion.repository.js
const { pool: db } = require('../config/database');

const InfraccionRepository = {
    create: async (data) => {
        const { vehiculo_id, fecha_infraccion, descripcion, valor, agente_id, camara_id } = data;
        const query = `
            INSERT INTO infracciones (vehiculo_id, fecha_infraccion, descripcion, valor, agente_id, camara_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        const values = [vehiculo_id, fecha_infraccion, descripcion, valor, agente_id, camara_id];
        const { rows } = await db.query(query, values);
        return rows[0];
    },

    // Get all infractions with vehicle and owner details
    findAllDetailed: async () => {
        const query = `
            SELECT
                i.id_infraccion,
                i.fecha_infraccion,
                v.placa,
                p.identificacion AS identificacion_propietario,
                at.nombre AS nombre_agente,
                c.codigo AS codigo_camara
            FROM infraccciones i
            LEFT JOIN vehiculos v ON i.vehiculo_id = v.id_vehiculo
            LEFT JOIN propietario p ON v.propietario_id = p.id_propietario
            LEFT JOIN agentes_transito at ON i.agente_id = at.id_agente
            LEFT JOIN camaras c ON i.camara_id = c.id_camaras
        `;
        const { rows } = await db.query(query);
        return rows;
    },

    delete: async (id) => {
        const query = 'DELETE FROM infracciones WHERE id_infraccion = $1 RETURNING *;';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
};

module.exports = InfraccionRepository;