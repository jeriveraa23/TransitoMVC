import { useEffect, useState } from 'react';
import { agenteService } from '../services/agenteService';
import FormAgente from '../components/agentes/formAgente';
import TablaAgentes from '../components/agentes/tablaAgentes';

const AgentesPage = () => {
  const [listaAgentes, setListaAgentes] = useState([]);
  const [agenteAEditar, setAgenteAEditar] = useState(null);

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
    <div className="page-shell">
      {/* Topbar Estandarizada con Badge de Ubicación */}
      <div className="topbar">
        <div>
          <h1>Gestión de Agentes</h1>
          <p>Registro de personal de tránsito municipal</p>
        </div>
        <span className="tag">Sabaneta - Movilidad</span>
      </div>

      <div className="content-panel">
        <div className="module-grid">
          
          {/* Formulario */}
          <div className="card">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
              {agenteAEditar ? 'Editar Agente' : 'Nuevo Registro'}
            </h2>
            <FormAgente 
              onAgenteCreated={cargarDatos} 
              datosEdicion={agenteAEditar} 
              onCancel={cancelarEdicion} 
            />
          </div>

          {/* Listado */}
          <div className="card">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Listado de Agentes</h2>
            <TablaAgentes 
              listaAgentes={listaAgentes} 
              onAgenteDeleted={cargarDatos} 
              onEdit={prepararEdicion} 
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default AgentesPage;