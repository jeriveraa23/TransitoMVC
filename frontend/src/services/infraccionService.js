import api from './api';

export const infraccionService = {
  list: async () => {
    const response = await api.post('', {
      query: `query { 
        listarInfracciones { 
          id_infraccion fecha_infraccion descripcion valor
          vehiculo { placa }
          agente { nombre }
          camara { codigo }
        } 
      }`
    });
    return response.data.data.listarInfracciones;
  },
  create: async (payload) => {
    const response = await api.post('', {
      query: `mutation($vehiculo_id: Int!, $fecha_infraccion: String!, $descripcion: String!, $valor: Float!, $agente_id: Int, $camara_id: Int) {
        crearInfraccion(vehiculo_id: $vehiculo_id, fecha_infraccion: $fecha_infraccion, descripcion: $descripcion, valor: $valor, agente_id: $agente_id, camara_id: $camara_id) { id_infraccion valor }
      }`,
      variables: payload
    });
    return response.data.data.crearInfraccion;
  },
  update: async (id, payload) => {
    const response = await api.post('', {
      query: `mutation($id: ID!, $vehiculo_id: Int!, $fecha_infraccion: String!, $descripcion: String!, $valor: Float!, $agente_id: Int, $camara_id: Int) {
        actualizarInfraccion(id: $id, vehiculo_id: $vehiculo_id, fecha_infraccion: $fecha_infraccion, descripcion: $descripcion, valor: $valor, agente_id: $agente_id, camara_id: $camara_id) { id_infraccion valor }
      }`,
      variables: { id, ...payload }
    });
    return response.data.data.actualizarInfraccion;
  },
  delete: async (id) => {
    const response = await api.post('', {
      query: `mutation($id: ID!) { eliminarInfraccion(id: $id) { id_infraccion } }`,
      variables: { id }
    });
    return response.data.data.eliminarInfraccion;
  },

  listDetallada: async () => {
    const response = await api.post('', {
      query: `query { 
        listarInfraccionesDetalladas { 
          id_infraccion fecha_infraccion descripcion valor
          placa identificacion_propietario nombre_agente codigo_camara
        } 
      }`
    });
    return response.data.data.listarInfraccionesDetalladas;
  },
};