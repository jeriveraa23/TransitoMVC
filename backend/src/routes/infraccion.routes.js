const express = require('express');
const infraccionController = require('../controllers/infraccion.controller');

const router = express.Router();

router.get('/', infraccionController.findAllDetailed);
router.post('/', infraccionController.create);
router.put('/:id', infraccionController.update);
router.delete('/:id', infraccionController.delete);

module.exports = router;