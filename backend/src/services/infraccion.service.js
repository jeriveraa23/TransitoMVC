const infraccionRepository = require('../repositories/infraccion.repository');

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

function validateOrigenInfraccion(agenteId, camaraId) {
    const hasAgente = agenteId !== undefined && agenteId !== null && String(agenteId).trim() !== '';
    const hasCamara = camaraId !== undefined && camaraId !== null && String(camaraId).trim() !== '';

    // Debe venir exactamente uno: agente o camara.
    if ((hasAgente && hasCamara) || (!hasAgente && !hasCamara)) {
        throw buildError('La infraccion debe tener solo un origen: agente_id o camara_id', 400);
    }
}

const infraccionService = {
    create: async (data) => {
        validateRequiredFields(data, ['vehiculo_id', 'fecha_infraccion', 'descripcion', 'valor']);
        validateOrigenInfraccion(data.agente_id, data.camara_id);

        if (Number(data.valor) <= 0) {
            throw buildError('El valor de la infraccion debe ser mayor a 0', 400);
        }

        return infraccionRepository.create(data);
    },

    findAllDetailed: async () => {
        return infraccionRepository.findAllDetailed();
    },

    remove: async (id) => {
        const infraccionId = Number(id);
        if (Number.isNaN(infraccionId) || infraccionId <= 0) {
            throw buildError('ID de infraccion invalido', 400);
        }

        const deleted = await infraccionRepository.delete(infraccionId);
        if (!deleted) {
            throw buildError('Infraccion no encontrada', 404);
        }

        return deleted;
    },
};

module.exports = infraccionService;


