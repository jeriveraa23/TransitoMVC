import api from './api';

export const camaraService = {
  list: async () => {
    const response = await api.post('', {
      query: `query { listarCamaras { id_camara codigo ubicacion } }`
    });
    return response.data.data.listarCamaras;
  },
  create: async (payload) => {
    const response = await api.post('', {
      query: `mutation($codigo: String!, $ubicacion: String!) {
        crearCamara(codigo: $codigo, ubicacion: $ubicacion) { id_camara codigo }
      }`,
      variables: payload
    });
    return response.data.data.crearCamara;
  },
  update: async (id, payload) => {
    const response = await api.post('', {
      query: `mutation($id: ID!, $codigo: String!, $ubicacion: String!) {
        actualizarCamara(id: $id, codigo: $codigo, ubicacion: $ubicacion) { id_camara codigo }
      }`,
      variables: { id, ...payload }
    });
    return response.data.data.actualizarCamara;
  },
  delete: async (id) => {
    const response = await api.post('', {
      query: `mutation($id: ID!) { eliminarCamara(id: $id) { id_camara } }`,
      variables: { id }
    });
    return response.data.data.eliminarCamara;
  }
};