import React from 'react';
import { propietarioService } from '../../services/propietarioService';

const TablaPropietarios = ({ listaPropietarios, onPropietarioDeleted, onEdit }) => {
  
  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este registro?")) {
      try {
        await propietarioService.delete(id);
        onPropietarioDeleted();
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  return (
    <div>
      <div style={{ 
        maxHeight: '450px',
        overflowY: 'auto',
        border: '1px solid #f1f5f9',
        borderRadius: '12px'
      }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {listaPropietarios.map((p) => (
            <li key={p.id_propietario} style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1.2rem',
              borderBottom: '1px solid #f1f5f9',
              backgroundColor: '#fff'
            }}>
              <div style={{ flex: 1 }}>
                <strong>{p.nombre}</strong>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  {p.identificacion} — {p.tipo_propietario}
                </div>
                <small style={{ color: '#94a3b8' }}>
                  {p.direccion}
                </small>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => onEdit(p)}>
                  Editar
                </button>

                <button onClick={() => handleEliminar(p.id_propietario)}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TablaPropietarios;