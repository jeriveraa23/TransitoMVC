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
  remove: async (id) => {
    await api.delete(`/camaras/${id}`);
  },
};
