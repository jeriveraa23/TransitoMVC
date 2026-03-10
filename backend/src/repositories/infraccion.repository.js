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

    findAllDetailed: async () => {
        const query = `
            SELECT
                i.id_infraccion,
                i.fecha_infraccion,
                i.descripcion,
                i.valor,
                i.vehiculo_id,
                i.agente_id,
                i.camara_id,
                v.placa,
                p.identificacion AS identificacion_propietario,
                at.nombre AS nombre_agente,
                c.codigo AS codigo_camara
            FROM infracciones i
            LEFT JOIN vehiculos v ON i.vehiculo_id = v.id_vehiculo
            LEFT JOIN propietario p ON v.propietario_id = p.id_propietario
            LEFT JOIN agentes_transito at ON i.agente_id = at.id_agente
            LEFT JOIN camaras c ON i.camara_id = c.id_camara
            ORDER BY i.fecha_infraccion DESC;
        `;
        const { rows } = await db.query(query);
        return rows;
    },

    update: async (id, data) => {
        const { vehiculo_id, fecha_infraccion, descripcion, valor, agente_id, camara_id } = data;
        const query = `
            UPDATE infracciones 
            SET vehiculo_id = $1, fecha_infraccion = $2, descripcion = $3, valor = $4, agente_id = $5, camara_id = $6
            WHERE id_infraccion = $7
            RETURNING *;
        `;
        const values = [vehiculo_id, fecha_infraccion, descripcion, valor, agente_id, camara_id, id];
        const { rows } = await db.query(query, values);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM infracciones WHERE id_infraccion = $1 RETURNING *;';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
};

module.exports = InfraccionRepository;