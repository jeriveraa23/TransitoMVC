const propietarioRepository = require('../repositories/propietario.repository');

function buildError(message, statusCode = 400) {
	const error = new Error(message);
	error.statusCode = statusCode;
	return error;
}

function validateTipoPropietario(tipo) {
	const validTypes = ['persona', 'empresa'];
	if (!validTypes.includes(tipo)) {
		throw buildError('tipo_propietario debe ser persona o empresa', 400);
	}
}

function validateRequiredFields(data, requiredFields) {
	for (const field of requiredFields) {
		if (!data[field] || String(data[field]).trim() === '') {
			throw buildError(`El campo ${field} es obligatorio`, 400);
		}
	}
}

const propietarioService = {
	create: async (data) => {
		validateRequiredFields(data, ['tipo_propietario', 'identificacion', 'nombre', 'direccion']);
		validateTipoPropietario(data.tipo_propietario);

		return propietarioRepository.create(data);
	},

	findAll: async () => {
		return propietarioRepository.findAll();
	},

	findById: async (id) => {
		const propietarioId = Number(id);
		if (Number.isNaN(propietarioId) || propietarioId <= 0) {
			throw buildError('ID de propietario invalido', 400);
		}

		const propietario = await propietarioRepository.findById(propietarioId);
		if (!propietario) {
			throw buildError('Propietario no encontrado', 404);
		}

		return propietario;
	},

	update: async (id, data) => {
		const propietarioId = Number(id);
		if (Number.isNaN(propietarioId) || propietarioId <= 0) {
			throw buildError('ID de propietario invalido', 400);
		}

		validateRequiredFields(data, ['tipo_propietario', 'nombre', 'direccion']);
		validateTipoPropietario(data.tipo_propietario);

		const updated = await propietarioRepository.update(propietarioId, data);
		if (!updated) {
			throw buildError('Propietario no encontrado', 404);
		}

		return updated;
	},

	delete: async (id) => {
		const propietarioId = Number(id);
		if (Number.isNaN(propietarioId) || propietarioId <= 0) {
			throw buildError('ID de propietario invalido', 400);
		}

		const deleted = await propietarioRepository.delete(propietarioId);
		if (!deleted) {
			throw buildError('Propietario no encontrado', 404);
		}

		return deleted;
	},
};

module.exports = propietarioService;
