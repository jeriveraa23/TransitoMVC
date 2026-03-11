import React, { useState, useEffect } from 'react';
import { agenteService } from '../../services/agenteService';

const FormAgente = ({ onAgenteCreated, datosEdicion, onCancel, mostrarMensaje }) => {

  const [formData, setFormData] = useState({
    identificacion: '',
    nombre: ''
  });

  useEffect(() => {
    if (datosEdicion) {
      setFormData({
        identificacion: datosEdicion.identificacion,
        nombre: datosEdicion.nombre
      });
    }
  }, [datosEdicion]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (datosEdicion) {
        await agenteService.update(datosEdicion.id_agente, formData);
        mostrarMensaje("Agente actualizado correctamente");
      } else {
        await agenteService.create(formData);
        mostrarMensaje("Agente registrado correctamente");
      }

      onAgenteCreated();
      handleCancelar();

    } catch (error) {

      mostrarMensaje("Error al guardar agente");

    }
  };

  const handleCancelar = () => {

    setFormData({
      identificacion: '',
      nombre: ''
    });

    onCancel();
  };

  const estiloInput = {
    width: '100%',
    padding: '0.8rem',
    borderRadius: '8px',
    border: '1px solid #dbe4ee',
    backgroundColor: '#f8fafc',
    fontSize: '0.9rem',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const estiloGrupo = { marginBottom: '1.2rem' };

  const estiloLabel = {
    display: 'block',
    marginBottom: '0.4rem',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#475569'
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '0.5rem' }}>

      <div style={estiloGrupo}>
        <label style={estiloLabel}>Identificación / Placa de Agente</label>

        <input
          type="text"
          value={formData.identificacion}
          onChange={(e) =>
            setFormData({ ...formData, identificacion: e.target.value })
          }
          placeholder="Ej: AGT-1020"
          style={estiloInput}
          required
        />
      </div>

      <div style={estiloGrupo}>
        <label style={estiloLabel}>Nombre Completo</label>

        <input
          type="text"
          value={formData.nombre}
          onChange={(e) =>
            setFormData({ ...formData, nombre: e.target.value })
          }
          placeholder="Ej: Carlos Ruiz"
          style={estiloInput}
          required
        />
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '1.5rem' }}>

        <button
          type="submit"
          className="nav-chip is-active"
          style={{
            flex: 2,
            border: 'none',
            cursor: 'pointer',
            padding: '0.8rem',
            fontWeight: 'bold'
          }}
        >
          {datosEdicion ? 'Actualizar Agente' : 'Registrar Agente'}
        </button>

        {datosEdicion && (
          <button
            type="button"
            onClick={handleCancelar}
            style={{
              flex: 1,
              backgroundColor: '#64748b',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Cancelar
          </button>
        )}

      </div>
    </form>
  );
};

export default FormAgente;