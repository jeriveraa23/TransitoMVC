const vehiculoRepository = require('../repositories/vehiculo.repository');
const propietarioRepository = require('../repositories/propietario.repository');

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

function validateTipoVehiculo(tipo) {
	const validTypes = ['automovil', 'moto', 'carro_pesado'];
	if (!validTypes.includes(tipo)) {
		throw buildError('tipo_vehiculo debe ser automovil, moto o carro_pesado', 400);
	}
}

function validatePlaca(placa) {
	if (typeof placa !== 'string' || placa.trim().length < 5 || placa.trim().length > 10) {
		throw buildError('placa invalida, debe tener entre 5 y 10 caracteres', 400);
	}
}

async function validatePropietarioExists(propietarioId) {
	const propietario = await propietarioRepository.findById(propietarioId);
	if (!propietario) {
		throw buildError('El propietario_id no existe', 400);
	}
}

const vehiculoService = {
	create: async (data) => {
		validateRequiredFields(data, ['placa', 'marca', 'tipo_vehiculo', 'propietario_id']);
		validatePlaca(data.placa);
		validateTipoVehiculo(data.tipo_vehiculo);

		const propietarioId = Number(data.propietario_id);
		if (Number.isNaN(propietarioId) || propietarioId <= 0) {
			throw buildError('propietario_id invalido', 400);
		}
		await validatePropietarioExists(propietarioId);

		return vehiculoRepository.create({
			...data,
			propietario_id: propietarioId,
			placa: data.placa.trim().toUpperCase(),
			marca: data.marca.trim(),
		});
	},

	findAllWithPropietario: async () => {
		return vehiculoRepository.findAllWithPropietario();
	},

	findByPlaca: async (placa) => {
		validatePlaca(placa);

		const vehiculo = await vehiculoRepository.findByPlaca(placa.trim().toUpperCase());
		if (!vehiculo) {
			throw buildError('Vehiculo no encontrado', 404);
		}

		return vehiculo;
	},

	update: async (id, data) => {
		const vehiculoId = Number(id);
		if (Number.isNaN(vehiculoId) || vehiculoId <= 0) {
			throw buildError('ID de vehiculo invalido', 400);
		}

		validateRequiredFields(data, ['marca', 'tipo_vehiculo', 'propietario_id']);
		validateTipoVehiculo(data.tipo_vehiculo);

		const propietarioId = Number(data.propietario_id);
		if (Number.isNaN(propietarioId) || propietarioId <= 0) {
			throw buildError('propietario_id invalido', 400);
		}
		await validatePropietarioExists(propietarioId);

		const updated = await vehiculoRepository.update(vehiculoId, {
			marca: data.marca.trim(),
			tipo_vehiculo: data.tipo_vehiculo,
			propietario_id: propietarioId,
		});

		if (!updated) {
			throw buildError('Vehiculo no encontrado', 404);
		}

		return updated;
	},

	delete: async (id) => {
		const vehiculoId = Number(id);
		if (Number.isNaN(vehiculoId) || vehiculoId <= 0) {
			throw buildError('ID de vehiculo invalido', 400);
		}

		const deleted = await vehiculoRepository.delete(vehiculoId);
		if (!deleted) {
			throw buildError('Vehiculo no encontrado', 404);
		}

		return deleted;
	},
};

module.exports = vehiculoService;
