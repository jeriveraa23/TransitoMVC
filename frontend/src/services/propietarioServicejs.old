import api from './api';

export const propietarioService = {
  list: async () => {
    const { data } = await api.get('/propietarios');
    return data;
  },
  create: async (payload) => {
    const { data } = await api.post('/propietarios', payload);
    return data;
  },
  delete: async (id) => {
    await api.delete(`/propietarios/${id}`);
  },
  update: async (id, payload) => {
    const { data } = await api.put(`/propietarios/${id}`, payload);
    return data;
  },
};
