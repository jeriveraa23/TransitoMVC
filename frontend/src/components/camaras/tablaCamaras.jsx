import React from 'react';
import { camaraService } from '../../services/camaraService';

const TablaCamaras = ({ listaCamaras, onCamaraDeleted, onEdit }) => {
  const handleEliminar = async (id) => {
    if (window.confirm("¿Desea eliminar esta cámara?")) {
      try {
        await camaraService.delete(id);
        onCamaraDeleted();
        alert("✅ Cámara eliminada");
      } catch (error) {
        alert("❌ Error al eliminar");
      }
    }
  };

  return (
    <div style={{ 
      maxHeight: '450px', 
      overflowY: 'auto', 
      border: '1px solid #f1f5f9', 
      borderRadius: '12px' 
    }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {listaCamaras.map((c) => (
          <li key={c.id_camara} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '1.2rem', 
            borderBottom: '1px solid #f1f5f9',
            backgroundColor: '#fff'
          }}>
            <div style={{ flex: 1 }}>
              <strong style={{ display: 'block', color: '#0f172a', fontSize: '1rem', marginBottom: '0.2rem' }}>
                {c.codigo}
              </strong>
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>
                {c.ubicacion}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {/* AQUÍ ESTÁ EL ERROR: Debe llevar el estilo blanco con borde */}
              <button 
                className="nav-chip" 
                onClick={() => onEdit(c)} 
                style={{ 
                  fontSize: '0.75rem', 
                  cursor: 'pointer', 
                  backgroundColor: '#ffffff', // Fondo blanco
                  color: '#1e293b', 
                  border: '1px solid #e2e8f0', // Borde gris claro
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontWeight: '600'
                }}
              >
                Editar
              </button>

              <button 
                className="nav-chip is-active" 
                onClick={() => handleEliminar(c.id_camara)} 
                style={{ 
                  fontSize: '0.75rem', 
                  cursor: 'pointer', 
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontWeight: '600',
                  backgroundColor: '#0f172a', // Fondo oscuro
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
  );
};

export default TablaCamaras;