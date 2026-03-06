const camaraRepository = require('../repositories/camara.repository');

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

function normalizeCodigo(codigo) {
	return String(codigo).trim().toUpperCase();
}

const camaraService = {
	create: async (data) => {
		validateRequiredFields(data, ['codigo', 'ubicacion']);

		return camaraRepository.create({
			codigo: normalizeCodigo(data.codigo),
			ubicacion: String(data.ubicacion).trim(),
		});
	},

	findAll: async () => {
		return camaraRepository.findAll();
	},

	findByCodigo: async (codigo) => {
		if (!codigo || String(codigo).trim() === '') {
			throw buildError('El codigo es obligatorio', 400);
		}

		const camara = await camaraRepository.findByCodigo(normalizeCodigo(codigo));
		if (!camara) {
			throw buildError('Camara no encontrada', 404);
		}

		return camara;
	},

	update: async (id, data) => {
		const camaraId = Number(id);
		if (Number.isNaN(camaraId) || camaraId <= 0) {
			throw buildError('ID de camara invalido', 400);
		}

		validateRequiredFields(data, ['codigo', 'ubicacion']);

		const updated = await camaraRepository.update(camaraId, {
			codigo: normalizeCodigo(data.codigo),
			ubicacion: String(data.ubicacion).trim(),
		});

		if (!updated) {
			throw buildError('Camara no encontrada', 404);
		}

		return updated;
	},

	remove: async (id) => {
		const camaraId = Number(id);
		if (Number.isNaN(camaraId) || camaraId <= 0) {
			throw buildError('ID de camara invalido', 400);
		}

		const deleted = await camaraRepository.delete(camaraId);
		if (!deleted) {
			throw buildError('Camara no encontrada', 404);
		}

		return deleted;
	},
};

module.exports = camaraService;
