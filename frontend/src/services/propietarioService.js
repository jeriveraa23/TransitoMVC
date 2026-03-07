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
  remove: async (id) => {
    await api.delete(`/propietarios/${id}`);
  },
};
