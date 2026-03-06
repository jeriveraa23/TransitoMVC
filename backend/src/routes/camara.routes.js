const express = require('express');
const camaraController = require('../controllers/camara.controller');

const router = express.Router();

router.get('/', camaraController.findAll);
router.get('/codigo/:codigo', camaraController.findByCodigo);
router.post('/', camaraController.create);
router.put('/:id', camaraController.update);
router.delete('/:id', camaraController.delete);

module.exports = router;
