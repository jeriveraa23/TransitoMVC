import { useEffect, useState } from 'react';
import { camaraService } from '../services/camaraService';
import FormCamara from '../components/camaras/formCamara';
import TablaCamaras from '../components/camaras/tablaCamaras';

const CamarasPage = () => {
  const [listaCamaras, setListaCamaras] = useState([]);
  const [camaraAEditar, setCamaraAEditar] = useState(null);
  const [aviso, setAviso] = useState("");

  const cargarDatos = async () => {
    try {
      const data = await camaraService.list();
      setListaCamaras(data);
    } catch (error) { 
      console.error(error); 
    }
  };

  const notificar = (msg) => {
    setAviso(msg);
    setTimeout(() => setAviso(""), 3000);
  };

  useEffect(() => { cargarDatos(); }, []);

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
          <h1>Gestión de Cámaras</h1>
          <p>Control de dispositivos de fotomulta y vigilancia</p>
        </div>
        <span className="tag">Sabaneta - Movilidad</span>
      </div>

      <div className="content-panel">
        <div className="module-grid">

          <div className="card">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
              {camaraAEditar ? 'Editar Cámara' : 'Nuevo Registro'}
            </h2>

            <FormCamara 
              onCamaraCreated={(msg) => {
                cargarDatos();
                notificar(msg);
              }} 
              datosEdicion={camaraAEditar} 
              onCancel={() => setCamaraAEditar(null)} 
            />
          </div>

          <div className="card">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
              Listado de Cámaras
            </h2>

            <TablaCamaras 
              listaCamaras={listaCamaras} 
              onCamaraDeleted={(msg) => {
                cargarDatos();
                notificar(msg);
              }}
              onEdit={(c) => setCamaraAEditar(c)} 
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

export default CamarasPage;