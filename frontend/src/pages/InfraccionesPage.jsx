import { useEffect, useState } from 'react';
import { infraccionService } from '../services/infraccionService';
import FormInfraccion from '../components/infracciones/formInfraccion';
import TablaInfracciones from '../components/infracciones/tablaInfracciones';

const InfraccionesPage = () => {
  const [listaInfracciones, setListaInfracciones] = useState([]);
  const [infraccionAEditar, setInfraccionAEditar] = useState(null);
  const [aviso, setAviso] = useState(""); // Centralizado aquí

  const cargarDatos = async () => {
    try {
      const data = await infraccionService.list();
      setListaInfracciones(data);
    } catch (error) {
      console.error("Error al cargar infracciones:", error);
    }
  };

  // Función para disparar el mensaje sin el "localhost dice"
  const notificar = (mensaje) => {
    setAviso(mensaje);
    setTimeout(() => setAviso(""), 3000);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <div className="page-shell" style={{ position: 'relative' }}>
      
      {/* NOTIFICACIÓN PROFESIONAL */}
      {aviso && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#0f172a',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '8px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          zIndex: 9999,
          fontWeight: '500',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          {aviso}
        </div>
      )}

      <div className="topbar">
        <div>
          <h1>Gestión de Infracciones</h1>
          <p>Registro y control de comparendos de Sabaneta</p>
        </div>
        <span className="tag">Movilidad</span>
      </div>

      <div className="content-panel">
        <div className="module-grid">
          <div className="card">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
              {infraccionAEditar ? 'Editar Registro' : 'Nuevo Registro'}
            </h2>
            <FormInfraccion 
              onInfraccionCreated={() => {
                cargarDatos();
                notificar(infraccionAEditar ? "Infracción editada correctamente" : "Infracción guardada correctamente");
              }} 
              datosEdicion={infraccionAEditar}
              onCancel={() => setInfraccionAEditar(null)}
            />
          </div>

          <div className="card">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Listado de Infracciones</h2>
            <TablaInfracciones 
              lista={listaInfracciones} 
              onDeleted={() => {
                cargarDatos();
                notificar("Infracción eliminada correctamente");
              }}
              onEdit={(inf) => setInfraccionAEditar(inf)}
            />
          </div>
        </div>
      </div>

      {/* Estilo simple para la animación de entrada */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default InfraccionesPage;