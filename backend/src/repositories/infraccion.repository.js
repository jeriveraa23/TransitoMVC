// backend/src/repositories/infraccion.repository.js
const db = require('../config/database');

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
            SELECT i.*, v.placa, p.nombre as owner_name
            FROM infracciones i
            JOIN vehiculos v ON i.vehiculo_id = v.id_vehiculo
            JOIN propietario p ON v.propietario_id = p.id_propietario;
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