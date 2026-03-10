import React from 'react';
import { vehiculoService } from '../../services/vehiculoService';

const TablaVehiculos = ({ listaVehiculos, onVehiculoDeleted, onEdit }) => {
  
  const handleEliminar = async (id) => {
    if (window.confirm("¿Desea eliminar este vehículo?")) {
      try {
        await vehiculoService.delete(id);
        onVehiculoDeleted();
        alert("✅ Vehículo eliminado");
      } catch (error) {
        alert("❌ Error al eliminar");
      }
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
                  Dueño: <span style={{ fontWeight: '600', color: '#0f172a' }}>{v.nombre_propietario}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.6rem' }}>
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
    </div>
  );
};

export default TablaVehiculos;