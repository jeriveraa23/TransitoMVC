const AgenteRepository = require('../repositories/agente.repository')
const CamaraRepository = require('../repositories/camara.repository')
const InfraccionRepository = require('../repositories/infraccion.repository')
const PropietarioRepository = require('../repositories/propietario.repository')
const VehiculoRepository = require('../repositories/vehiculo.repository')
const VehiculoService = require('../services/vehiculo.service')

const resolvers = {
    Query: {
        // --- AGENTES ---
        agentePorId: async (_, { id }) => await AgenteRepository.findById(id),
        listarAgentes: async () => await AgenteRepository.findAll(),

        // --- CÁMARAS ---
        buscarCamaraCodigo: async (_, { codigo }) => await CamaraRepository.findByCodigo(codigo),
        listarCamaras: async () => await CamaraRepository.findAll(),
        buscarCamarasPorUbicacion: async (_, { ubicacion }) => await CamaraRepository.findByLocation(ubicacion),

        // --- PROPIETARIOS ---
        listarPropietarios: async () => await PropietarioRepository.findAll(),
        propietarioPorId: async (_, { id }) => await PropietarioRepository.findById(id),

        // --- VEHÍCULOS ---
        buscarVehiculoPlaca: async (_, { placa }) => await VehiculoService.findByPlaca(placa),
        vehiculoPorId: async (_, { id }) => await VehiculoService.findById(id),
        listarVehiculos: async () => await VehiculoService.findAll(),

        // --- INFRACCIONES ---
        listarInfracciones: async () => await InfraccionRepository.findAll(),
        listarInfraccionesDetalladas: async () => await InfraccionRepository.findAllDetailed(),
    },


    Mutation: {
        // --- AGENTES ---
        crearAgente: async (_, args) => await AgenteRepository.create(args),
        actualizarAgente: async (_, { id, ...data }) => await AgenteRepository.update(id, data),
        eliminarAgente: async (_, { id }) => await AgenteRepository.delete(id),

        // --- CÁMARAS ---
        crearCamara: async (_, args) => await CamaraRepository.create(args),
        actualizarCamara: async (_, { id, ...data }) => await CamaraRepository.update(id, data),
        eliminarCamara: async (_, { id }) => await CamaraRepository.delete(id),

        // --- PROPIETARIOS ---
        crearPropietario: async (_, args) => await PropietarioRepository.create(args),
        actualizarPropietario: async (_, { id, ...data }) => await PropietarioRepository.update(id, data),
        eliminarPropietario: async (_, { id }) => await PropietarioRepository.delete(id),

        // --- VEHÍCULOS ---
        crearVehiculo: async (_, args) => await VehiculoService.create(args),
        actualizarVehiculo: async (_, { id, ...data }) => await VehiculoService.update(id, data),
        actualizarImagenVehiculo: async (_, { id, imagen }) => await VehiculoService.updateImage(id, imagen),
        eliminarImagenVehiculo: async (_, { id }) => await VehiculoService.removeImage(id),
        eliminarVehiculo: async (_, { id }) => await VehiculoService.delete(id),

        // --- INFRACCIONES ---
        crearInfraccion: async (_, args) => await InfraccionRepository.create(args),
        actualizarInfraccion: async (_, { id, ...data }) => await InfraccionRepository.update(id, data),
        eliminarInfraccion: async (_, { id }) => await InfraccionRepository.delete(id),
    },
    // --- RESOLVERS DE CAMPO (Para manejar las relaciones entre objetos) ---
    Infraccion: {
        vehiculo: async (parent) => await VehiculoRepository.findById(parent.vehiculo_id),
        agente: async (parent) => parent.agente_id ? await AgenteRepository.findById(parent.agente_id) : null,
        camara: async (parent) => parent.camara_id ? await CamaraRepository.findById(parent.camara_id) : null,
    },

    Vehiculo: {
        propietario: async (parent) => await PropietarioRepository.findById(parent.propietario_id),
    }
};

module.exports = resolvers;