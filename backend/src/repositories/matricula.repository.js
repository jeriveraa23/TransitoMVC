// backend/src/repositories/matricula.repository.js
const db = require('../config/database');

const MatriculaRepository = {
    // Register a new vehicle license (registration)
    create: async (data) => {
        const { vehiculo_id, fecha_matricula } = data;
        const query = `
            INSERT INTO matricula (vehiculo_id, fecha_matricula)
            VALUES ($1, $2)
            RETURNING *;
        `;
        const { rows } = await db.query(query, [vehiculo_id, fecha_matricula]);
        return rows[0];
    },

    // Get all registrations with vehicle plate and owner name
    findAllDetailed: async () => {
        const query = `
            SELECT m.*, v.placa, p.nombre as owner_name
            FROM matricula m
            JOIN vehiculos v ON m.vehiculo_id = v.id_vehiculo
            JOIN propietario p ON v.propietario_id = p.id_propietario;
        `;
        const { rows } = await db.query(query);
        return rows;
    },

    // Find registration by Vehicle ID
    findByVehicleId: async (vehiculoId) => {
        const query = 'SELECT * FROM matricula WHERE vehiculo_id = $1;';
        const { rows } = await db.query(query, [vehiculoId]);
        return rows[0];
    },

    // Update registration date
    update: async (id, data) => {
        const { fecha_matricula } = data;
        const query = `
            UPDATE matricula 
            SET fecha_matricula = $1 
            WHERE id_matricula = $2 
            RETURNING *;
        `;
        const { rows } = await db.query(query, [fecha_matricula, id]);
        return rows[0];
    },

    // Delete a registration
    delete: async (id) => {
        const query = 'DELETE FROM matricula WHERE id_matricula = $1 RETURNING *;';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
};

module.exports = MatriculaRepository;