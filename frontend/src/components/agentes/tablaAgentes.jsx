import React from 'react';
import { agenteService } from '../../services/agenteService';

const TablaAgentes = ({ listaAgentes, onAgenteDeleted, onEdit, mostrarMensaje }) => {

  const handleEliminar = async (id) => {

    if (window.confirm("¿Desea eliminar este agente?")) {

      try {

        await agenteService.delete(id);

        mostrarMensaje("Agente eliminado correctamente");

        onAgenteDeleted();

      } catch (error) {

        mostrarMensaje("Error al eliminar agente");

      }

    }

  };

  return (
    <div>

      <div style={{
        maxHeight: '450px',
        overflowY: 'auto',
        paddingRight: '5px'
      }}>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>

          {listaAgentes.map((a) => (

            <li
              key={a.id_agente}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.2rem',
                marginBottom: '1rem',
                backgroundColor: '#fff',
                border: '1px solid #f1f5f9',
                borderRadius: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}
            >

              <div style={{ flex: 1 }}>

                <strong
                  style={{
                    display: 'block',
                    color: '#0f172a',
                    fontSize: '1.1rem',
                    marginBottom: '0.2rem'
                  }}
                >
                  {a.nombre}
                </strong>

                <span
                  style={{
                    fontSize: '0.9rem',
                    color: '#64748b',
                    fontWeight: '500'
                  }}
                >
                  ID: {a.identificacion}
                </span>

              </div>

              <div style={{ display: 'flex', gap: '0.6rem' }}>

                <button
                  className="nav-chip"
                  onClick={() => onEdit(a)}
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
                  onClick={() => handleEliminar(a.id_agente)}
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

      {listaAgentes.length === 0 && (

        <p
          style={{
            textAlign: 'center',
            color: '#94a3b8',
            marginTop: '2rem',
            fontSize: '0.9rem'
          }}
        >
          No hay agentes registrados.
        </p>

      )}

    </div>
  );
};

export default TablaAgentes;