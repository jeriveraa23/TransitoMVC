import { useEffect, useState } from 'react';
import { vehiculoService } from '../services/vehiculoService';
import FormVehiculo from '../components/vehiculos/formVehiculo';
import TablaVehiculos from '../components/vehiculos/tablaVehiculos';

const VehiculosPage = () => {
  const [listaVehiculos, setListaVehiculos] = useState([]);
  const [vehiculoAEditar, setVehiculoAEditar] = useState(null);

  // Función para traer los datos del backend
  const cargarDatos = async () => {
    try {
      const data = await vehiculoService.list();
      setListaVehiculos(data);
    } catch (error) {
      console.error("Error al cargar vehículos:", error);
    }
  };

  // Función puente para activar la edición
  const prepararEdicion = (vehiculo) => {
    setVehiculoAEditar(vehiculo);
  };

  const cancelarEdicion = () => {
    setVehiculoAEditar(null);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <div className="page-shell">
      {/* Topbar idéntica a Propietarios */}
      <div className="topbar">
        <div>
          <h1>Gestión de Vehículos</h1>
          <p>Control de parque automotor y vinculación de dueños</p>
        </div>
        <span className="tag">Sabaneta - Movilidad</span>
      </div>

      <div className="content-panel">
        <div className="module-grid">
          
          {/* Lado Izquierdo: Formulario */}
          <div className="card">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
              {vehiculoAEditar ? 'Editar Vehículo' : 'Nuevo Registro'}
            </h2>
            <FormVehiculo 
              onVehiculoCreated={cargarDatos} 
              datosEdicion={vehiculoAEditar}
              onCancel={cancelarEdicion}
            />
          </div>

          {/* Lado Derecho: Listado con Scroll */}
          <div className="card">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Listado de Vehículos</h2>
            <TablaVehiculos 
              listaVehiculos={listaVehiculos} 
              onVehiculoDeleted={cargarDatos}
              onEdit={prepararEdicion}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default VehiculosPage;