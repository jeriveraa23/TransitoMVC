import { useEffect, useState } from 'react';
import { propietarioService } from '../services/propietarioService';
import FormPropietario from '../components/propietarios/formPropietario';
import TablaPropietarios from '../components/propietarios/tablaPropietarios';

const PropietariosPage = () => {
  const [listaPropietarios, setListaPropietarios] = useState([]);
  const [propietarioAEditar, setPropietarioAEditar] = useState(null);
  const [aviso, setAviso] = useState("");

  const cargarDatos = async () => {
    try {
      const data = await propietarioService.list();
      setListaPropietarios(data);
    } catch (error) { console.error("Error al cargar:", error); }
  };

  const notificar = (msg) => {
    setAviso(msg);
    setTimeout(() => setAviso(""), 3000);
  };

  useEffect(() => { cargarDatos(); }, []);

  return (
    <div className="page-shell" style={{ position: 'relative' }}>
      {/* NOTIFICACIÓN FLOTANTE A LA DERECHA */}
      {aviso && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px', backgroundColor: '#0f172a',
          color: 'white', padding: '1rem 2rem', borderRadius: '8px',
          zIndex: 9999, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          {aviso}
        </div>
      )}

      <div className="topbar">
        <div>
          <h1>Gestión de Propietarios</h1>
          <p>Registro y consulta de dueños de vehículos</p>
        </div>
        <span className="tag">Sabaneta - Movilidad</span>
      </div>

      <div className="content-panel">
        <div className="module-grid">
          <div className="card">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
              {propietarioAEditar ? 'Editar Propietario' : 'Nuevo Registro'}
            </h2>
            <FormPropietario 
              onPropietarioCreated={(msg) => {
                cargarDatos();
                notificar(msg);
              }} 
              datosEdicion={propietarioAEditar}
              onCancel={() => setPropietarioAEditar(null)}
            />
          </div>

          <div className="card">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Listado de Propietarios</h2>
            <TablaPropietarios 
              listaPropietarios={listaPropietarios} 
              onPropietarioDeleted={() => {
                cargarDatos();
                notificar("Propietario eliminado correctamente");
              }}
              onEdit={(p) => setPropietarioAEditar(p)}
            />
          </div>
        </div>
      </div>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }`}</style>
    </div>
  );
};

export default PropietariosPage;