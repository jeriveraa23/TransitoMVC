import api from './api';

export const infraccionService = {
  list: async () => {
    const { data } = await api.get('/infracciones');
    return data;
  },
  create: async (payload) => {
    const { data } = await api.post('/infracciones', payload);
    return data;
  },
  remove: async (id) => {
    await api.delete(`/infracciones/${id}`);
  },
};
