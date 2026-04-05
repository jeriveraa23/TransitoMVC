import axios from 'axios';

const API_URL = 'http://localhost:3000/api/infracciones';

export const infraccionService = {
  list: async () => {
    const res = await axios.get(API_URL);
    return res.data;
  },
  create: async (data) => {
    return await axios.post(API_URL, data);
  },
  update: async (id, data) => {
    return await axios.put(`${API_URL}/${id}`, data);
  },
  delete: async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
  }
};