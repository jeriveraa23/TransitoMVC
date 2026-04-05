import React from 'react';
import { infraccionService } from '../../services/infraccionService';

const TablaInfracciones = ({ lista, onDeleted, onEdit }) => {

  const handleEliminar = async (id) => {
    if (window.confirm("¿Desea eliminar esta infracción?")) {
      try {
        await infraccionService.delete(id);
        onDeleted();
      } catch (error) { 
        console.error("Error al eliminar la infracción", error);
      }
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ maxHeight: '480px', overflowY: 'auto', border: '1px solid #f1f5f9', borderRadius: '12px' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {(lista || []).map((i) => {
            console.log("Infraccion:", i);
            return (
              <li key={`inf-${i.id_infraccion}`} style={{ display: 'flex', justifyContent: 'space-between', padding: '1.2rem', borderBottom: '1px solid #f1f5f9', backgroundColor: '#fff' }}>
                <div style={{ flex: 1 }}>
                  <strong style={{ display: 'block', color: '#0f172a' }}>
                    {i.vehiculo?.placa || "Sin Placa"}
                  </strong>
                  
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    {i.agente 
                      ? `Agente: ${i.agente.nombre}` 
                      : i.camara 
                        ? `Cámara: ${i.camara.codigo}` 
                        : "Origen no especificado"}
                  </div>

                  <div style={{ fontSize: '0.9rem', color: '#1e293b' }}>
                    ${Number(i.valor).toLocaleString()} - {i.fecha_infraccion ? new Date(Number(i.fecha_infraccion)).toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' }) : "Fecha inválida"}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button onClick={() => onEdit(i)} style={{ padding: '5px 12px', borderRadius: '8px', border: '1px solid #ddd', cursor: 'pointer', fontSize: '0.8rem' }}>
                    Editar
                  </button>
                  <button onClick={() => handleEliminar(i.id_infraccion)} style={{ padding: '5px 12px', borderRadius: '8px', border: 'none', backgroundColor: '#0f172a', color: 'white', cursor: 'pointer', fontSize: '0.8rem' }}>
                    Borrar
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TablaInfracciones;