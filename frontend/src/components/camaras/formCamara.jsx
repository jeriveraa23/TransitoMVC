import React, { useState, useEffect } from 'react';
import { camaraService } from '../../services/camaraService';

const FormCamara = ({ onCamaraCreated, datosEdicion, onCancel }) => {
  const [formData, setFormData] = useState({ codigo: '', ubicacion: '' });

  useEffect(() => {
    if (datosEdicion) {
      setFormData({ codigo: datosEdicion.codigo, ubicacion: datosEdicion.ubicacion });
    }
  }, [datosEdicion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (datosEdicion) {
        await camaraService.update(datosEdicion.id_camara, formData);
        alert("✅ Cámara actualizada");
      } else {
        await camaraService.create(formData);
        alert("✅ Cámara registrada");
      }
      onCamaraCreated();
      handleCancelar();
    } catch (error) {
      alert("❌ Error: " + (error.response?.data?.error || error.message));
    }
  };

  const handleCancelar = () => {
    setFormData({ codigo: '', ubicacion: '' });
    onCancel();
  };

  const estiloInput = { width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #dbe4ee', backgroundColor: '#f8fafc', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' };
  const estiloLabel = { display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '600', color: '#475569' };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '0.5rem' }}>
      <div style={{ marginBottom: '1.2rem' }}>
        <label style={estiloLabel}>Código de Cámara (ID Único)</label>
        <input 
          type="text" 
          value={formData.codigo}
          onChange={(e) => setFormData({...formData, codigo: e.target.value.toUpperCase()})}
          placeholder="Ej: CAM-001"
          style={estiloInput}
          required 
        />
      </div>

      <div style={{ marginBottom: '1.2rem' }}>
        <label style={estiloLabel}>Ubicación / Dirección</label>
        <input 
          type="text" 
          value={formData.ubicacion}
          onChange={(e) => setFormData({...formData, ubicacion: e.target.value})}
          placeholder="Ej: Carrera 43 con Calle 50"
          style={estiloInput}
          required 
        />
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '1.5rem' }}>
        <button type="submit" className="nav-chip is-active" style={{ flex: 2, border: 'none', cursor: 'pointer', padding: '0.8rem', fontWeight: 'bold' }}>
          {datosEdicion ? 'Actualizar Cámara' : 'Registrar Cámara'}
        </button>
        {datosEdicion && (
          <button type="button" onClick={handleCancelar} style={{ flex: 1, backgroundColor: '#64748b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default FormCamara;