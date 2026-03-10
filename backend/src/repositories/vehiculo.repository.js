// backend/src/repositories/vehiculo.repository.js
const { pool: db } = require('../config/database');

const VehiculoRepository = {
    // Crear un nuevo vehículo vinculándolo a un propietario existente
    create: async (datos) => {
        const { placa, marca, fecha_matricula, tipo_vehiculo, propietario_id } = datos;
        const query = `
            INSERT INTO vehiculos (placa, marca, fecha_matricula, tipo_vehiculo, propietario_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [placa, marca, fecha_matricula, tipo_vehiculo, propietario_id];
        const { rows } = await db.query(query, values);
        return rows[0];
    },

    // Buscar un vehículo por su placa (usando el índice idx_vehiculos_propietario_id)
    findByPlaca: async (placa) => {
        const query = 'SELECT * FROM vehiculos WHERE placa = $1;';
        const { rows } = await db.query(query, [placa]);
        return rows[0];
    },

    // Obtener todos los vehículos con el nombre de su dueño (JOIN)
    findAll: async () => {
        const query = `
            SELECT 
            v.*, 
            p.nombre as nombre_propietario 
            FROM vehiculos v
            JOIN propietario p ON v.propietario_id = p.id_propietario;
        `;
        const { rows } = await db.query(query);
        return rows;
    },

    update: async (id, datos) => {
        const { marca, fecha_matricula, tipo_vehiculo, propietario_id } = datos;
        const query = `
            UPDATE vehiculos 
            SET marca = $1, fecha_matricula = $2, tipo_vehiculo = $3, propietario_id = $4
            WHERE id_vehiculo = $5
            RETURNING *;
        `;
        const values = [marca, fecha_matricula, tipo_vehiculo, propietario_id, id];
        const { rows } = await db.query(query, values);
        return rows[0]; // Retorna el vehículo actualizado
    },

    delete: async (id) => {
        const query = 'DELETE FROM vehiculos WHERE id_vehiculo = $1 RETURNING *;';
        const { rows } = await db.query(query, [id]);
        return rows[0]; // Retorna el registro eliminado para confirmar
    }

    

};

module.exports = VehiculoRepository;