import api from './api';

export const agenteService = {
  list: async () => {
    const { data } = await api.get('/agentes');
    return data;
  },
  create: async (payload) => {
    const { data } = await api.post('/agentes', payload);
    return data;
  },
  remove: async (id) => {
    await api.delete(`/agentes/${id}`);
  },
};
