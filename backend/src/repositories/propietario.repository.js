// backend/src/repositories/propietario.repository.js
const { pool: db } = require('../config/database');

const PropietarioRepository = {
    // Create a new owner (Person or Company)
    create: async (data) => {
        const { tipo_propietario, identificacion, nombre, direccion } = data;
        const query = `
            INSERT INTO propietario (tipo_propietario, identificacion, nombre, direccion)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [tipo_propietario, identificacion, nombre, direccion];
        const { rows } = await db.query(query, values);
        return rows[0];
    },

    findAll: async () => {
        const { rows } = await db.query('SELECT * FROM propietario;');
        return rows;
    },

    findById: async (id) => {
        const query = 'SELECT * FROM propietario WHERE id_propietario = $1;';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    },

    update: async (id, data) => {
        const { tipo_propietario, nombre, direccion } = data;
        const query = `
            UPDATE propietario 
            SET tipo_propietario = $1, nombre = $2, direccion = $3
            WHERE id_propietario = $4
            RETURNING *;
        `;
        const values = [tipo_propietario, nombre, direccion, id];
        const { rows } = await db.query(query, values);
        return rows[0];
    },

    delete: async (id) => {
        const query = 'DELETE FROM propietario WHERE id_propietario = $1 RETURNING *;';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
};

module.exports = PropietarioRepository;