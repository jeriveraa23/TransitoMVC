import api from './api';

export const vehiculoService = {
  list: async () => {
    const response = await api.post('', {
      query: `query { 
        listarVehiculos { 
          id_vehiculo placa marca fecha_matricula tipo_vehiculo propietario_id
          propietario { nombre } 
        } 
      }`
    });
    return response.data.data.listarVehiculos;
  },
create: async (payload) => {
    const response = await api.post('', {
      query: `mutation($placa: String!, $marca: String!, $fecha_matricula: String!, $tipo_vehiculo: String!, $propietario_id: Int!) {
        crearVehiculo(placa: $placa, marca: $marca, fecha_matricula: $fecha_matricula, tipo_vehiculo: $tipo_vehiculo, propietario_id: $propietario_id) { id_vehiculo placa }
      }`,
      variables: {
        ...payload,
        // Convertimos el ID a número entero para que GraphQL no proteste
        propietario_id: parseInt(payload.propietario_id, 10)
      }
    });
    return response.data.data.crearVehiculo;
  },

update: async (id, payload) => {
    const response = await api.post('', {
      query: `mutation($id: ID!, $marca: String!, $fecha_matricula: String!, $tipo_vehiculo: String!, $propietario_id: Int!) {
        actualizarVehiculo(id: $id, marca: $marca, fecha_matricula: $fecha_matricula, tipo_vehiculo: $tipo_vehiculo, propietario_id: $propietario_id) { id_vehiculo placa }
      }`,
      variables: { 
        id, 
        ...payload,
        // También lo convertimos aquí por si acaso
        propietario_id: parseInt(payload.propietario_id, 10)
      }
    });
    return response.data.data.actualizarVehiculo;
},
  delete: async (id) => {
    const response = await api.post('', {
      query: `mutation($id: ID!) { eliminarVehiculo(id: $id) { id_vehiculo } }`,
      variables: { id }
    });
    return response.data.data.eliminarVehiculo;
  }
};