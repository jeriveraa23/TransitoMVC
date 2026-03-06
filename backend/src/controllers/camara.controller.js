const camaraService = require('../services/camara.service');

const CamaraController = {
    create: async (req, res) => {
        try {
            const nuevaCamara = await camaraService.create(req.body);
            res.status(201).json(nuevaCamara);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },

    findAll: async (req, res) => {
        try {
            const camaras = await camaraService.findAll();
            res.status(200).json(camaras);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },

    findByCodigo: async (req, res) => {
        try {
            const { codigo } = req.params;
            const camara = await camaraService.findByCodigo(codigo);
            res.status(200).json(camara);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const updated = await camaraService.update(req.params.id, req.body);
            res.status(200).json(updated);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            await camaraService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
};

module.exports = CamaraController;