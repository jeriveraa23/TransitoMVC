const propietarioService = require('../services/propietario.service');

const PropietarioController = {
    create: async (req, res) => {
        try {
            const nuevoPropietario = await propietarioService.create(req.body);
            res.status(201).json(nuevoPropietario);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },

    findAll: async (req, res) => {
        try {
            const propietarios = await propietarioService.findAll();
            res.status(200).json(propietarios);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },

    findById: async (req, res) => {
        try {
            const propietario = await propietarioService.findById(req.params.id);
            res.status(200).json(propietario);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const updated = await propietarioService.update(req.params.id, req.body);
            res.status(200).json(updated);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            await propietarioService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
};

module.exports = PropietarioController;