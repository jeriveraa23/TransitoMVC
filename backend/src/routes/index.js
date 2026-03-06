const express = require('express');

const propietarioRoutes = require('./propietario.routes');
const vehiculoRoutes = require('./vehiculo.routes');
const infraccionRoutes = require('./infraccion.routes');
const agenteRoutes = require('./agente.routes');
const camaraRoutes = require('./camara.routes');

const router = express.Router();

router.use('/propietarios', propietarioRoutes);
router.use('/vehiculos', vehiculoRoutes);
router.use('/infracciones', infraccionRoutes);
router.use('/agentes', agenteRoutes);
router.use('/camaras', camaraRoutes);

module.exports = router;
