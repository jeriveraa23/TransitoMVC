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
  update: async (id, payload) => {
    const { data } = await api.put(`/vehiculos/${id}`, payload);
    return data;
  },
  delete: async (id) => {
    const { data } = await api.delete(`/vehiculos/${id}`);
    return data;
  }
};