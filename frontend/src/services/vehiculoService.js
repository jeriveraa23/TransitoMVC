import api from './api';

export const vehiculoService = {
  list: async () => {
    const { data } = await api.get('/vehiculos');
    return data;
  },
  create: async (payload) => {
    const { data } = await api.post('/vehiculos', payload);
    return data;
  },
  remove: async (id) => {
    await api.delete(`/vehiculos/${id}`);
  },
};
