import React, { useState, useEffect } from 'react';
import { propietarioService } from '../../services/propietarioService';

const FormPropietario = ({ onPropietarioCreated, datosEdicion, onCancel }) => {
  const [formData, setFormData] = useState({
    tipo_propietario: 'persona',
    identificacion: '',
    nombre: '',
    direccion: ''
  });

  useEffect(() => {
    if (datosEdicion) {
      setFormData({
        tipo_propietario: datosEdicion.tipo_propietario,
        identificacion: datosEdicion.identificacion,
        nombre: datosEdicion.nombre,
        direccion: datosEdicion.direccion
      });
    }
  }, [datosEdicion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (datosEdicion) {
        await propietarioService.update(datosEdicion.id_propietario, formData);
        alert("✅ Propietario actualizado correctamente");
      } else {
        await propietarioService.create(formData);
        alert("✅ Propietario registrado con éxito");
      }
      onPropietarioCreated();
      handleCancelar();
    } catch (error) {
      alert("❌ Error: " + (error.response?.data?.error || error.message));
    }
  };

  const handleCancelar = () => {
    setFormData({ tipo_propietario: 'persona', identificacion: '', nombre: '', direccion: '' });
    onCancel();
  };

  // --- ESTÁNDAR VISUAL ---
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

  const estiloGrupo = {
    marginBottom: '1.2rem'
  };

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
        <label style={estiloLabel}>Tipo de Propietario</label>
        <select 
          value={formData.tipo_propietario}
          onChange={(e) => setFormData({...formData, tipo_propietario: e.target.value})}
          style={estiloInput}
        >
          <option value="persona">Persona Natural</option>
          <option value="empresa">Empresa</option>
        </select>
      </div>

      <div style={estiloGrupo}>
        <label style={estiloLabel}>Identificación (Cédula/NIT)</label>
        <input 
          type="text" 
          value={formData.identificacion}
          onChange={(e) => setFormData({...formData, identificacion: e.target.value})}
          placeholder="Ej: 1000394717"
          style={estiloInput}
          required 
        />
      </div>

      <div style={estiloGrupo}>
        <label style={estiloLabel}>Nombre Completo / Razón Social</label>
        <input 
          type="text" 
          value={formData.nombre}
          onChange={(e) => setFormData({...formData, nombre: e.target.value})}
          placeholder="Ej: Jorge Perez"
          style={estiloInput}
          required 
        />
      </div>

      <div style={estiloGrupo}>
        <label style={estiloLabel}>Dirección de Residencia</label>
        <input 
          type="text" 
          value={formData.direccion}
          onChange={(e) => setFormData({...formData, direccion: e.target.value})}
          placeholder="Ej: Calle 10 # 45-20"
          style={estiloInput}
          required 
        />
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '1.5rem' }}>
        <button 
          type="submit" 
          className="nav-chip is-active" 
          style={{ flex: 2, border: 'none', cursor: 'pointer', padding: '0.8rem', fontWeight: 'bold' }}
        >
          {datosEdicion ? 'Actualizar Propietario' : 'Registrar Propietario'}
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
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default FormPropietario;