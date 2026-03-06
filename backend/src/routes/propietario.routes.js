const express = require('express');
const propietarioController = require('../controllers/propietario.controller');

const router = express.Router();

router.get('/', propietarioController.findAll);
router.get('/:id', propietarioController.findById);
router.post('/', propietarioController.create);
router.put('/:id', propietarioController.update);
router.delete('/:id', propietarioController.delete);

module.exports = router;
