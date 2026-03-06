const express = require('express');
const vehiculoController = require('../controllers/vehiculo.controller');

const router = express.Router();

router.get('/', vehiculoController.findAll);
router.get('/placa/:placa', vehiculoController.findByPlaca);
router.post('/', vehiculoController.create);
router.put('/:id', vehiculoController.update);
router.delete('/:id', vehiculoController.delete);

module.exports = router;
