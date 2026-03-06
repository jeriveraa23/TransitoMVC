const vehiculoService = require('../services/vehiculo.service');

const VehiculoController = {
    create: async (req, res) => {
        try {
            const nuevoVehiculo = await vehiculoService.create(req.body);
            res.status(201).json(nuevoVehiculo);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },

    findAll: async (req, res) => {
        try {
            const vehiculos = await vehiculoService.findAll();
            res.status(200).json(vehiculos);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },

    findByPlaca: async (req, res) => {
        try {
            const { placa } = req.params;
            const vehiculo = await vehiculoService.findByPlaca(placa);
            res.status(200).json(vehiculo);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const updated = await vehiculoService.update(req.params.id, req.body);
            res.status(200).json(updated);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            await vehiculoService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
};

module.exports = VehiculoController;