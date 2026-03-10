import api from './api';

export const camaraService = {
  list: async () => {
    const { data } = await api.get('/camaras');
    return data;
  },
  create: async (payload) => {
    const { data } = await api.post('/camaras', payload);
    return data;
  },
  update: async (id, payload) => {
    const { data } = await api.put(`/camaras/${id}`, payload);
    return data;
  },
  delete: async (id) => {
    const { data } = await api.delete(`/camaras/${id}`);
    return data;
  }
};