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
  update: async (id, payload) => {
    const { data } = await api.put(`/agentes/${id}`, payload);
    return data;
  },
  delete: async (id) => {
    const { data } = await api.delete(`/agentes/${id}`);
    return data;
  }
};