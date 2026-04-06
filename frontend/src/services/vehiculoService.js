import api from './api';

export const vehiculoService = {
  list: async () => {
    const response = await api.post('', {
      query: `query { 
        listarVehiculos { 
          id_vehiculo placa marca fecha_matricula tipo_vehiculo propietario_id tiene_imagen
          propietario { nombre } 
        } 
      }`
    });
    return response.data.data.listarVehiculos;
  },
  getById: async (id) => {
    const response = await api.post('', {
      query: `query($id: ID!) {
        vehiculoPorId(id: $id) {
          id_vehiculo placa marca fecha_matricula tipo_vehiculo propietario_id imagen tiene_imagen
          propietario { nombre }
        }
      }`,
      variables: { id }
    });
    return response.data.data.vehiculoPorId;
  },
create: async (payload) => {
    const response = await api.post('', {
      query: `mutation($placa: String!, $marca: String!, $fecha_matricula: String!, $tipo_vehiculo: String!, $propietario_id: Int!, $imagen: String) {
        crearVehiculo(placa: $placa, marca: $marca, fecha_matricula: $fecha_matricula, tipo_vehiculo: $tipo_vehiculo, propietario_id: $propietario_id, imagen: $imagen) {
          id_vehiculo placa tiene_imagen
        }
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
      query: `mutation($id: ID!, $marca: String!, $fecha_matricula: String!, $tipo_vehiculo: String!, $propietario_id: Int!, $imagen: String) {
        actualizarVehiculo(id: $id, marca: $marca, fecha_matricula: $fecha_matricula, tipo_vehiculo: $tipo_vehiculo, propietario_id: $propietario_id, imagen: $imagen) {
          id_vehiculo placa tiene_imagen
        }
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
  updateImage: async (id, imagen) => {
    const response = await api.post('', {
      query: `mutation($id: ID!, $imagen: String!) {
        actualizarImagenVehiculo(id: $id, imagen: $imagen) { id_vehiculo tiene_imagen imagen }
      }`,
      variables: { id, imagen }
    });
    return response.data.data.actualizarImagenVehiculo;
  },
  removeImage: async (id) => {
    const response = await api.post('', {
      query: `mutation($id: ID!) {
        eliminarImagenVehiculo(id: $id) { id_vehiculo tiene_imagen }
      }`,
      variables: { id }
    });
    return response.data.data.eliminarImagenVehiculo;
  },
  delete: async (id) => {
    const response = await api.post('', {
      query: `mutation($id: ID!) { eliminarVehiculo(id: $id) { id_vehiculo } }`,
      variables: { id }
    });
    return response.data.data.eliminarVehiculo;
  }
};