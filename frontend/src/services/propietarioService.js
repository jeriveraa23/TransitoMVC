import api from './api';

export const propietarioService = {
  list: async () => {
    const response = await api.post('', {
      query: `query { listarPropietarios { id_propietario tipo_propietario identificacion nombre direccion } }`
    });
    return response.data.data.listarPropietarios;
  },
  create: async (payload) => {
    const response = await api.post('', {
      query: `mutation($tipo_propietario: String!, $identificacion: String!, $nombre: String!, $direccion: String!) {
        crearPropietario(tipo_propietario: $tipo_propietario, identificacion: $identificacion, nombre: $nombre, direccion: $direccion) { id_propietario nombre }
      }`,
      variables: payload
    });
    return response.data.data.crearPropietario;
  },
  update: async (id, payload) => {
    const response = await api.post('', {
      query: `mutation($id: ID!, $tipo_propietario: String!, $nombre: String!, $direccion: String!) {
        actualizarPropietario(id: $id, tipo_propietario: $tipo_propietario, nombre: $nombre, direccion: $direccion) { id_propietario nombre }
      }`,
      variables: { id, ...payload }
    });
    return response.data.data.actualizarPropietario;
  },
  delete: async (id) => {
    const response = await api.post('', {
      query: `mutation($id: ID!) { eliminarPropietario(id: $id) { id_propietario } }`,
      variables: { id }
    });
    return response.data.data.eliminarPropietario;
  }
};