import React from 'react';
import { propietarioService } from '../../services/propietarioService';

const TablaPropietarios = ({ listaPropietarios, onPropietarioDeleted, onEdit }) => {
  
  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este registro?")) {
      try {
        await propietarioService.delete(id); 
        onPropietarioDeleted(); 
        alert("✅ Eliminado correctamente");
      } catch (error) {
        const mensajeReal = error.response?.data?.error || error.message || "Error desconocido";
        alert("❌ Error: " + mensajeReal);
      }
    }
  };

  return (
    <div>
      {/* Contenedor con Scroll y sin encabezados de texto */}
      <div style={{ 
        maxHeight: '450px', 
        overflowY: 'auto', 
        paddingRight: '5px',
        border: '1px solid #f1f5f9',
        borderRadius: '12px'
      }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {listaPropietarios.map((p) => (
            <li key={p.id_propietario} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '1.2rem', 
              borderBottom: '1px solid #f1f5f9',
              backgroundColor: '#fff'
            }}>
              <div style={{ flex: 1 }}>
                <strong style={{ display: 'block', color: '#0f172a', fontSize: '1rem', marginBottom: '0.2rem' }}>
                  {p.nombre}
                </strong>
                <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>
                  {p.identificacion} — {p.tipo_propietario}
                </span>
                <small style={{ display: 'block', color: '#94a3b8', marginTop: '0.2rem' }}>
                  {p.direccion}
                </small>
              </div>

              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <button 
                  className="nav-chip" 
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
                  onClick={() => onEdit(p)}
                >
                  Editar
                </button>

                <button 
                  className="nav-chip is-active" 
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
                  onClick={() => handleEliminar(p.id_propietario)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      {listaPropietarios.length === 0 && (
        <p style={{ textAlign: 'center', color: '#94a3b8', marginTop: '2rem', fontSize: '0.9rem' }}>
          No hay propietarios registrados.
        </p>
      )}
    </div>
  );
};

export default TablaPropietarios;