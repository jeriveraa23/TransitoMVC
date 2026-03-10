import { useEffect, useState } from 'react';
import { propietarioService } from '../services/propietarioService';
import FormPropietario from '../components/propietarios/formPropietario';
import TablaPropietarios from '../components/propietarios/tablaPropietarios';

const PropietariosPage = () => {
  const [listaPropietarios, setListaPropietarios] = useState([]);
  const [propietarioAEditar, setPropietarioAEditar] = useState(null);

  const cargarDatos = async () => {
    try {
      const data = await propietarioService.list();
      setListaPropietarios(data);
    } catch (error) {
      console.error("Error al cargar:", error);
    }
  };

  const prepararEdicion = (propietario) => {
    console.log("Recibiendo datos para editar:", propietario); // Para verificar en consola
    setPropietarioAEditar(propietario);
  };

  const cancelarEdicion = () => {
    setPropietarioAEditar(null);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <div className="page-shell">
      <div className="topbar">
        <div>
          <h1>Gestión de Propietarios</h1>
          <p>Registro y consulta de dueños de vehículos</p>
        </div>
        <span className="tag">Sabaneta - Movilidad</span>
      </div>

      <div className="content-panel">
        <div className="module-grid">
          {/* Lado Izquierdo: Formulario */}
          <div className="card">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Nuevo Registro</h2>
            <FormPropietario E
              onPropietarioCreated={cargarDatos} 
              datosEdicion={propietarioAEditar}
              onCancel={() => setPropietarioAEditar(null)}
            />
          </div>

          {/* Lado Derecho: Listado */}
          <div className="card">
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Listado de Propietarios</h2>
            <TablaPropietarios 
              listaPropietarios={listaPropietarios} 
              onPropietarioDeleted={cargarDatos}
              onEdit={prepararEdicion}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropietariosPage;