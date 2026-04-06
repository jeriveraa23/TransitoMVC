import { useEffect, useState } from 'react';
import { vehiculoService } from '../services/vehiculoService';
import FormVehiculo from '../components/vehiculos/formVehiculo';
import TablaVehiculos from '../components/vehiculos/tablaVehiculos';

const VehiculosPage = () => {
  const [listaVehiculos, setListaVehiculos] = useState([]);
  const [vehiculoAEditar, setVehiculoAEditar] = useState(null);
  const [aviso, setAviso] = useState("");

  const cargarDatos = async () => {
    try {
      const data = await vehiculoService.list();
      setListaVehiculos(data);
    } catch (error) {
      console.error("Error al cargar vehículos:", error);
      const message = error?.response?.data?.errors?.[0]?.message || "No se pudo cargar el listado de vehículos";
      setAviso(message);
    }
  };

  const notificar = (msg) => {
    setAviso(msg);
    setTimeout(() => setAviso(""), 3000);
  };

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
    <div className="page-shell" style={{ position: 'relative' }}>

      {aviso && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#0f172a',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '8px',
          zIndex: 9999,
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          {aviso}
        </div>
      )}

      <div className="topbar">
        <div>
          <h1>Gestión de Vehículos</h1>
          <p>Control de parque automotor y vinculación de dueños</p>
        </div>
        <span className="tag">Sabaneta - Movilidad</span>
      </div>

      <div className="content-panel">
        <div className="module-grid">
          
          <div className="card">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
              {vehiculoAEditar ? 'Editar Vehículo' : 'Nuevo Registro'}
            </h2>
            <FormVehiculo 
              onVehiculoCreated={(msg)=>{
                cargarDatos();
                notificar(msg);
              }}
              datosEdicion={vehiculoAEditar}
              onCancel={cancelarEdicion}
            />
          </div>

          <div className="card">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Listado de Vehículos</h2>
            <TablaVehiculos 
              listaVehiculos={listaVehiculos} 
              onVehiculoDeleted={()=>{
                cargarDatos();
                notificar("Vehículo eliminado correctamente");
              }}
              onEdit={prepararEdicion}
              onVehiculoUpdated={(msg)=>{
                cargarDatos();
                notificar(msg);
              }}
            />
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity:0; transform:translateX(20px); }
          to { opacity:1; transform:translateX(0); }
        }
      `}</style>

    </div>
  );
};

export default VehiculosPage;