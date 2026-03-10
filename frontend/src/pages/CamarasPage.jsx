import { useEffect, useState } from 'react';
import { camaraService } from '../services/camaraService';
import FormCamara from '../components/camaras/formCamara';
import TablaCamaras from '../components/camaras/tablaCamaras';

const CamarasPage = () => {
  const [listaCamaras, setListaCamaras] = useState([]);
  const [camaraAEditar, setCamaraAEditar] = useState(null);

  const cargarDatos = async () => {
    try {
      const data = await camaraService.list();
      setListaCamaras(data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => { cargarDatos(); }, []);

  return (
    <div className="page-shell">
      <div className="topbar">
        <div>
          <h1>Gestión de Cámaras</h1>
          <p>Control de dispositivos de fotomulta y vigilancia</p>
        </div>
        <span className="tag">Sabaneta - Movilidad</span>
      </div>

      <div className="content-panel">
        <div className="module-grid">
          <div className="card">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{camaraAEditar ? 'Editar Cámara' : 'Nuevo Registro'}</h2>
            <FormCamara onCamaraCreated={cargarDatos} datosEdicion={camaraAEditar} onCancel={() => setCamaraAEditar(null)} />
          </div>
          <div className="card">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Listado de Cámaras</h2>
            <TablaCamaras listaCamaras={listaCamaras} onCamaraDeleted={cargarDatos} onEdit={(c) => setCamaraAEditar(c)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CamarasPage;