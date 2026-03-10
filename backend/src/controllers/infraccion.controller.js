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

    update: async (req, res) => {
        try {
            const updated = await infraccionService.update(req.params.id, req.body);
            res.status(200).json(updated);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            await infraccionService.delete(req.params.id); // Usando delete en lugar de remove
            res.status(204).send();
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
};

module.exports = InfraccionController;