import React, { useState } from 'react';
import { vehiculoService } from '../../services/vehiculoService';

const TablaVehiculos = ({ listaVehiculos, onVehiculoDeleted, onEdit, onVehiculoUpdated }) => {
  const [vehiculoConImagen, setVehiculoConImagen] = useState(null);
  const [cargandoImagen, setCargandoImagen] = useState(false);
  
  const handleEliminar = async (id) => {
    if (window.confirm("¿Desea eliminar este vehículo?")) {
      try {
        await vehiculoService.delete(id);
        onVehiculoDeleted();
      } catch (error) {
        console.error("Error al eliminar vehículo", error);
      }
    }
  };

  const handleMostrarImagen = async (vehiculoSeleccionado) => {
    if (vehiculoSeleccionado?.imagen) {
      setVehiculoConImagen(vehiculoSeleccionado);
      return;
    }

    const idVehiculo = vehiculoSeleccionado?.id_vehiculo;
    if (!idVehiculo) {
      onVehiculoUpdated('No se pudo identificar el vehiculo.');
      return;
    }

    setCargandoImagen(true);
    try {
      const vehiculo = await vehiculoService.getById(idVehiculo);
      if (!vehiculo?.imagen) {
        onVehiculoUpdated('Este vehiculo no tiene imagen registrada.');
        return;
      }
      setVehiculoConImagen(vehiculo);
    } catch (error) {
      onVehiculoUpdated(error?.response?.data?.errors?.[0]?.message || 'No se pudo cargar la imagen del vehiculo.');
    } finally {
      setCargandoImagen(false);
    }
  };

  const handleEliminarImagen = async () => {
    if (!vehiculoConImagen?.id_vehiculo) {
      return;
    }

    if (!window.confirm('¿Desea eliminar la imagen de este vehiculo?')) {
      return;
    }

    try {
      await vehiculoService.removeImage(vehiculoConImagen.id_vehiculo);
      setVehiculoConImagen(null);
      onVehiculoUpdated('Imagen eliminada correctamente.');
      onVehiculoDeleted();
    } catch (error) {
      onVehiculoUpdated(error?.response?.data?.errors?.[0]?.message || 'No se pudo eliminar la imagen.');
    }
  };

  return (
    <div>
      {/* Contenedor con Scroll y sin encabezados ni iconos */}
      <div style={{ 
        maxHeight: '450px', 
        overflowY: 'auto', 
        paddingRight: '5px',
        border: '1px solid #f1f5f9',
        borderRadius: '12px'
      }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {listaVehiculos.map((v) => (
            <li key={v.id_vehiculo} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '1.2rem', 
              borderBottom: '1px solid #f1f5f9',
              backgroundColor: '#fff'
            }}>
              <div style={{ flex: 1 }}>
                <strong style={{ display: 'block', color: '#0f172a', fontSize: '1.1rem', marginBottom: '0.2rem' }}>
                  {v.placa}
                </strong>
                <span style={{ fontSize: '0.9rem', color: '#475569', fontWeight: '500' }}>
                  {v.marca} — {v.tipo_vehiculo}
                </span>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.3rem' }}>
                  Dueño: <span style={{ fontWeight: '600', color: '#0f172a' }}>{v.propietario?.nombre || "Sin asignar"}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <button
                  className="nav-chip"
                  onClick={() => handleMostrarImagen(v)}
                  style={{
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    backgroundColor: '#ecfeff',
                    color: '#155e75',
                    border: '1px solid #a5f3fc',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontWeight: '600',
                    opacity: 1
                  }}
                  disabled={cargandoImagen}
                  title="Mostrar imagen del vehiculo"
                >
                  {cargandoImagen ? 'Cargando...' : 'Mostrar imagen'}
                </button>
                <button 
                  className="nav-chip" 
                  onClick={() => onEdit(v)} 
                  style={{ 
                    fontSize: '0.75rem', 
                    cursor: 'pointer', 
                    backgroundColor: '#ffffff', 
                    color: '#1e293b', 
                    border: '1px solid #e2e8f0',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontWeight: '600'
                  }}
                >
                  Editar
                </button>
                <button 
                  className="nav-chip is-active" 
                  onClick={() => handleEliminar(v.id_vehiculo)} 
                  style={{ 
                    fontSize: '0.75rem', 
                    cursor: 'pointer', 
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontWeight: '600',
                    backgroundColor: '#0f172a',
                    color: '#fff'
                  }}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      {listaVehiculos.length === 0 && (
        <p style={{ textAlign: 'center', color: '#94a3b8', marginTop: '2rem', fontSize: '0.9rem' }}>
          No hay vehículos registrados.
        </p>
      )}

      {vehiculoConImagen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '1rem'
          }}
          onClick={() => setVehiculoConImagen(null)}
        >
          <div
            style={{
              width: 'min(560px, 95vw)',
              backgroundColor: '#ffffff',
              borderRadius: '14px',
              padding: '1rem',
              boxShadow: '0 25px 45px -20px rgba(15, 23, 42, 0.55)'
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <h3 style={{ margin: '0 0 0.8rem 0', color: '#0f172a' }}>
              Imagen del vehiculo {vehiculoConImagen.placa}
            </h3>

            <img
              src={vehiculoConImagen.imagen}
              alt={`Vehiculo ${vehiculoConImagen.placa}`}
              style={{ width: '100%', maxHeight: '360px', objectFit: 'contain', borderRadius: '10px', border: '1px solid #dbe4ee' }}
            />

            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={handleEliminarImagen}
                style={{
                  backgroundColor: '#dc2626',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.55rem 0.9rem',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Eliminar imagen
              </button>
              <button
                type="button"
                onClick={() => setVehiculoConImagen(null)}
                style={{
                  backgroundColor: '#e2e8f0',
                  color: '#0f172a',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.55rem 0.9rem',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TablaVehiculos;