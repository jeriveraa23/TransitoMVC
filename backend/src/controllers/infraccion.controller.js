const infraccionService = require('../services/infraccion.service');

const InfraccionController = {
    create: async (req, res) => {
        try {
            const nuevaInfraccion = await infraccionService.create(req.body);
            res.status(201).json(nuevaInfraccion);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },

    findAllDetailed: async (req, res) => {
        try {
            const infracciones = await infraccionService.findAllDetailed();
            res.status(200).json(infracciones);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            await infraccionService.remove(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
};

module.exports = InfraccionController;