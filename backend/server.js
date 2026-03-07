require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { testConnection, pool } = require('./src/config/database');
const apiRoutes = require('./src/routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Servidor de Transito Sabaneta corriendo</h1>');
});

app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() AS server_time');
    res.json({
      ok: true,
      db: 'connected',
      time: result.rows[0].server_time,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      db: 'error',
      message: error.message,
    });
  }
});

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await testConnection();
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo conectar a PostgreSQL:', error.message);
    process.exit(1);
  }
})();