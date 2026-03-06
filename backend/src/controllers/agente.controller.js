const agenteService = require('../services/agente.service');

const AgenteController = {
    create: async (req, res) => {
        try {
            const nuevoAgente = await agenteService.create(req.body);
            res.status(201).json(nuevoAgente);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },

    findAll: async (req, res) => {
        try {
            const agentes = await agenteService.findAll();
            res.status(200).json(agentes);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },

    findById: async (req, res) => {
        try {
            const agente = await agenteService.findById(req.params.id);
            res.status(200).json(agente);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const updated = await agenteService.update(req.params.id, req.body);
            res.status(200).json(updated);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            await agenteService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
};

module.exports = AgenteController;