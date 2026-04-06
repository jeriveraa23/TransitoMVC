const agenteRepository = require('../repositories/agente.repository');

function buildError(message, statusCode = 400) {
	const error = new Error(message);
	error.statusCode = statusCode;
	return error;
}

function validateRequiredFields(data, requiredFields) {
	for (const field of requiredFields) {
		if (data[field] === undefined || data[field] === null || String(data[field]).trim() === '') {
			throw buildError(`El campo ${field} es obligatorio`, 400);
		}
	}
}

const agenteService = {
	create: async (data) => {
		validateRequiredFields(data, ['identificacion', 'nombre']);

		return agenteRepository.create({
			identificacion: String(data.identificacion).trim(),
			nombre: String(data.nombre).trim(),
		});
	},

	findAll: async () => {
		return agenteRepository.findAll();
	},

	findById: async (id) => {
		const agenteId = Number(id);
		if (Number.isNaN(agenteId) || agenteId <= 0) {
			throw buildError('ID de agente invalido', 400);
		}

		const agente = await agenteRepository.findById(agenteId);
		if (!agente) {
			throw buildError('Agente no encontrado', 404);
		}

		return agente;
	},

	update: async (id, data) => {
		const agenteId = Number(id);
		if (Number.isNaN(agenteId) || agenteId <= 0) {
			throw buildError('ID de agente invalido', 400);
		}

		validateRequiredFields(data, ['identificacion', 'nombre']);

		const updated = await agenteRepository.update(agenteId, {
			identificacion: String(data.identificacion).trim(),
			nombre: String(data.nombre).trim(),
		});

		if (!updated) {
			throw buildError('Agente no encontrado', 404);
		}

		return updated;
	},

	delete: async (id) => {
		const agenteId = Number(id);
		if (Number.isNaN(agenteId) || agenteId <= 0 ) {
			throw buildError('ID de agente invalido', 400);
		}

		const deleted = await agenteRepository.delete(agenteId);
		if (!deleted) {
			throw buildError('Agente no encontrado', 404);
		}

		return deleted;
	},
};

module.exports = agenteService;
