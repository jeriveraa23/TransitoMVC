// backend/src/repositories/camara.repository.js
const { pool: db } = require('../config/database');

const CamaraRepository = {
    // Register a new camera
    create: async (data) => {
        const { codigo, ubicacion } = data;
        const query = 'INSERT INTO camaras (codigo, ubicacion) VALUES ($1, $2) RETURNING *;';
        const { rows } = await db.query(query, [codigo, ubicacion]);
        return rows[0];
    },

    // Update camera location or its unique code
    update: async (id, data) => {
        const { codigo, ubicacion } = data;
        const query = `
            UPDATE camaras 
            SET codigo = $1, ubicacion = $2 
            WHERE id_camara = $3 
            RETURNING *;
        `;
        const { rows } = await db.query(query, [codigo, ubicacion, id]);
        return rows[0];
    },

    // Delete a camera
    delete: async (id) => {
        const query = 'DELETE FROM camaras WHERE id_camara = $1 RETURNING *;';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    },

    findByCodigo: async (codigo) => {
        const query = 'SELECT * FROM camaras WHERE codigo = $1;';
        const { rows } = await db.query(query, [codigo]);
        return rows[0];
    },

    findAll: async () => {
        const { rows } = await db.query('SELECT * FROM camaras;');
        return rows;
    },

    findByLocation: async (location) => {
        const query = `
            SELECT * FROM camaras 
            WHERE ubicacion ILIKE $1 
            ORDER BY codigo ASC;
        `;
        const values = [`%${location}%`];
        const { rows } = await db.query(query, values);
        return rows;
    },
};

module.exports = CamaraRepository;