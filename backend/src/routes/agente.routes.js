const express = require('express');
const agenteController = require('../controllers/agente.controller');

const router = express.Router();

router.get('/', agenteController.findAll);
router.get('/:id', agenteController.findById);
router.post('/', agenteController.create);
router.put('/:id', agenteController.update);
router.delete('/:id', agenteController.delete);

module.exports = router;
