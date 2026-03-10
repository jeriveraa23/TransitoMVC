import { useEffect, useState } from 'react';
import { infraccionService } from '../services/infraccionService';
import FormInfraccion from '../components/infracciones/formInfraccion';
import TablaInfracciones from '../components/infracciones/tablaInfracciones';

const InfraccionesPage = () => {
  const [listaInfracciones, setListaInfracciones] = useState([]);
  const [infraccionAEditar, setInfraccionAEditar] = useState(null);

  const cargarDatos = async () => {
    try {
      // Usamos .list() asegurándonos que el service esté bien exportado
      const data = await infraccionService.list();
      setListaInfracciones(data);
    } catch (error) {
      console.error("Error al cargar infracciones:", error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <div className="page-shell">
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
              onInfraccionCreated={cargarDatos} 
              datosEdicion={infraccionAEditar}
              onCancel={() => setInfraccionAEditar(null)}
            />
          </div>

          <div className="card">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Listado</h2>
            <TablaInfracciones 
              lista={listaInfracciones} 
              onDeleted={cargarDatos}
              onEdit={(inf) => setInfraccionAEditar(inf)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfraccionesPage;