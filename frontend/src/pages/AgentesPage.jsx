import { useEffect, useState } from 'react';
import { agenteService } from '../services/agenteService';
import FormAgente from '../components/agentes/formAgente';
import TablaAgentes from '../components/agentes/tablaAgentes';

const AgentesPage = () => {

  const [listaAgentes, setListaAgentes] = useState([]);
  const [agenteAEditar, setAgenteAEditar] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const mostrarMensaje = (texto) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(""), 3000);
  };

  const cargarDatos = async () => {
    try {
      const data = await agenteService.list();
      setListaAgentes(data);
    } catch (error) {
      console.error("Error al cargar agentes:", error);
    }
  };

  const prepararEdicion = (agente) => setAgenteAEditar(agente);

  const cancelarEdicion = () => setAgenteAEditar(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <div className="page-shell" style={{ position: 'relative' }}>

      {mensaje && (
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
          {mensaje}
        </div>
      )}

      <div className="topbar">
        <div>
          <h1>Gestión de Agentes</h1>
          <p>Registro de personal de tránsito municipal</p>
        </div>
        <span className="tag">Sabaneta - Movilidad</span>
      </div>

      <div className="content-panel">
        <div className="module-grid">
          
          <div className="card">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
              {agenteAEditar ? 'Editar Agente' : 'Nuevo Registro'}
            </h2>

            <FormAgente
              onAgenteCreated={cargarDatos}
              datosEdicion={agenteAEditar}
              onCancel={cancelarEdicion}
              mostrarMensaje={mostrarMensaje}
            />
          </div>

          <div className="card">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
              Listado de Agentes
            </h2>

            <TablaAgentes
              listaAgentes={listaAgentes}
              onAgenteDeleted={cargarDatos}
              onEdit={prepararEdicion}
              mostrarMensaje={mostrarMensaje}
            />
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

    </div>
  );
};

export default AgentesPage;