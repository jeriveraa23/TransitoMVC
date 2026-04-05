import api from './api';

export const agenteService = {
  list: async () => {
    const response = await api.post('', {
      query: `query { listarAgentes { id_agente identificacion nombre } }`
    });
    return response.data.data.listarAgentes;
  },
  create: async (payload) => {
    const response = await api.post('', {
      query: `mutation($identificacion: String!, $nombre: String!) {
        crearAgente(identificacion: $identificacion, nombre: $nombre) { id_agente nombre }
      }`,
      variables: payload
    });
    return response.data.data.crearAgente;
  },
  update: async (id, payload) => {
    const response = await api.post('', {
      query: `mutation($id: ID!, $identificacion: String!, $nombre: String!) {
        actualizarAgente(id: $id, identificacion: $identificacion, nombre: $nombre) { id_agente nombre }
      }`,
      variables: { id, ...payload }
    });
    return response.data.data.actualizarAgente;
  },
  delete: async (id) => {
    const response = await api.post('', {
      query: `mutation($id: ID!) { eliminarAgente(id: $id) { id_agente } }`,
      variables: { id }
    });
    return response.data.data.eliminarAgente;
  }
};