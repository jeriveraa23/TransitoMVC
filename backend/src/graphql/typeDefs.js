const { gql } = require('apollo-server-express');

const typeDefs = gql`
# --- DEFINICIÓN DE OBJETOS ---#

type Propietario {
    id_propietario: ID!
    tipo_propietario: String!
    identificacion: String!
    nombre: String!
    direccion: String!
    vehiculos: [Vehiculo]
}

type Vehiculo {
    id_vehiculo: ID!
    placa: String!
    marca: String!
    fecha_matricula: String!
    tipo_vehiculo: String!
    propietario: Propietario
}

type Agente {
    id_agente: ID!
    identificacion: String!
    nombre: String!
}

type Camara {
    id_camara: ID!
    codigo: String!
    ubicacion: String!
}

type Infraccion {
    id_infraccion: ID!
    fecha_infraccion: String!
    descripcion: String!
    valor: Float!
    vehiculo: Vehiculo
    agente: Agente
    camara: Camara
}

# --- CONSULTAS ---#

type Query {
    # Agentes (findById, findAll)
    agentePorId(id: ID!): Agente
    listarAgentes: [Agente]

    # Cámaras (findByCodigo, findAll, findByLocation)
    buscarCamaraCodigo(codigo: String!): Camara
    listarCamaras: [Camara]
    buscarCamarasPorUbicacion(ubicacion: String!): [Camara]

    # Infracciones (findAllDetailed)
    # reporteDetalladoInfracciones: [InfraccionDetallada]

    # Propietarios (findAll, findById)
    listarPropietarios: [Propietario]
    propietarioPorId(id: ID!): Propietario

    # Vehículos (findByPlaca, findAll)
    buscarVehiculoPlaca(placa: String!): Vehiculo
    listarVehiculos: [Vehiculo]
}

#--- MUTACIONES ---#
type Mutation {
    # Agentes
    crearAgente(identificacion: String!, nombre: String!): Agente
    actualizarAgente(id: ID!, identificacion: String!, nombre: String!): Agente
    eliminarAgente(id: ID!): Agente

    # Cámaras
    crearCamara(codigo: String!, ubicacion: String!): Camara
    actualizarCamara(id; ID!, codigo: String!, ubicacion: String!): Camara
    eliminarCamara(id: ID!): Camara

    # Propietarios
    crearPropietario(tipo_propietario: String!, identificacion: String!, nombre: String!, direccion: String!): Propietario
    actualizarPropietario(id: ID!, tipo_propietario: String!, nombre: String!, direccion: String!): Propietario
    eliminarPropietario(id: ID!): Propietario

    # Vehículos
    crearVehiculo(placa: String!, marca: String!, fecha_matricula: String!, tipo_vehiculo: String!, propietario_id: Int!): Vehiculo
    actualizarVehiculo(id: ID!, marca: String!, fecha_matricula: String!, tipo_vehiculo: String!, propietario_id: Int!): Vehiculo
    eliminarVehiculo(id: ID!): Vehiculo

    # Infracciones
    crearInfraccion(vehiculo_id: Int!, fecha_infraccion: String!, descripcion: String!, valor: Float!, agente_id: Int, camara_id: Int): Infraccion
    actualizarInfraccion(id: ID!, vehiculo_id: Int!, fecha_infraccion: String!, descripcion: String!, valor: Float!, agente_id: int, camara_id: int): Infraccion
    eliminarInfraccion(id: ID!): Infraccion

}


`;