const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Prueba simple para validar que conecta.
async function testConnection() {
  const client = await pool.connect();
  try {
    await client.query('SELECT 1');
    console.log('Conexion a PostgreSQL OK');
  } finally {
    client.release();
  }
}

// Mantiene compatibilidad con repositorios que usan db.query(...)
const query = (text, params) => pool.query(text, params);

module.exports = {
  pool,
  query,
  testConnection,
};