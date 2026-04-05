// src/services/api.js
import axios from 'axios';

const api = axios.create({
  // Cambia el 3000 por 4000 y agrega /graphql al final
  baseURL: 'http://localhost:4000/graphql', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;