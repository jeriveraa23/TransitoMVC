const { pool: db } = require('../config/database');

const AgenteRepository = {

    create: async (data) => {
        const { identificacion, nombre } = data;
        const query = 'INSERT INTO agentes_transito (identificacion, nombre) VALUES ($1, $2) RETURNING *;';
        const { rows } = await db.query(query, [identificacion, nombre]);
        return rows[0];
    },

   
    update: async (id, data) => {
        const { identificacion, nombre } = data;
        const query = `
            UPDATE agentes_transito 
            SET identificacion = $1, nombre = $2 
            WHERE id_agente = $3 
            RETURNING *;
        `;
        const { rows } = await db.query(query, [identificacion, nombre, id]);
        return rows[0];
    },

 
    delete: async (id) => {
        const query = 'DELETE FROM agentes_transito WHERE id_agente = $1 RETURNING *;';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    },

    findById: async (id) => {
        const query = 'SELECT * FROM agentes_transito WHERE id_agente = $1;';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    },

    findAll: async () => {
        const { rows } = await db.query('SELECT * FROM agentes_transito;');
        return rows;
    }
};

module.exports = AgenteRepository;