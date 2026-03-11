import React, { useState, useEffect } from 'react';
import { infraccionService } from '../../services/infraccionService';
import { vehiculoService } from '../../services/vehiculoService';
import { agenteService } from '../../services/agenteService';
import { camaraService } from '../../services/camaraService';

const FormInfraccion = ({ onInfraccionCreated, datosEdicion, onCancel }) => {
  const [listas, setListas] = useState({ vehiculos: [], agentes: [], camaras: [] });
  const [origen, setOrigen] = useState('agente'); 
  
  const [formData, setFormData] = useState({
    vehiculo_id: '',
    fecha_infraccion: '',
    descripcion: '',
    valor: '',
    agente_id: '',
    camara_id: ''
  });

  useEffect(() => {
    const cargarData = async () => {
      try {
        const [v, a, c] = await Promise.all([
          vehiculoService.list(),
          agenteService.list(),
          camaraService.list()
        ]);
        setListas({ vehiculos: v, agentes: a, camaras: c });
      } catch (e) { console.error("Error al cargar datos", e); }
    };
    cargarData();
  }, []);

  useEffect(() => {
    if (datosEdicion) {
      setFormData({
        ...datosEdicion,
        fecha_infraccion: datosEdicion.fecha_infraccion ? datosEdicion.fecha_infraccion.split('.')[0] : ''
      });
      setOrigen(datosEdicion.camara_id ? 'camara' : 'agente');
    }
  }, [datosEdicion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Creamos el payload base con los datos comunes
      const payload = {
        vehiculo_id: parseInt(formData.vehiculo_id),
        fecha_infraccion: formData.fecha_infraccion,
        descripcion: formData.descripcion,
        valor: parseFloat(formData.valor)
      };

      // Inyectamos SOLO el ID del origen seleccionado como null o número
      if (origen === 'agente') {
        payload.agente_id = parseInt(formData.agente_id);
        payload.camara_id = null; // Asegura que el otro sea explícitamente null
      } else {
        payload.camara_id = parseInt(formData.camara_id);
        payload.agente_id = null; // Asegura que el otro sea explícitamente null
      }

      if (datosEdicion) {
        await infraccionService.update(datosEdicion.id_infraccion, payload);
      } else {
        await infraccionService.create(payload);
      }
      onInfraccionCreated();
      handleCancelar();
    } catch (error) {
      // Si falla, mostramos el error exacto para saber qué campo está molestando
      alert("Error: " + (error.response?.data?.error || error.message));
    }
  };

  const handleCancelar = () => {
    setFormData({ vehiculo_id: '', fecha_infraccion: '', descripcion: '', valor: '', agente_id: '', camara_id: '' });
    onCancel();
  };

  const estiloInput = { width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #dbe4ee', backgroundColor: '#f8fafc', fontSize: '0.9rem', boxSizing: 'border-box' };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '600' }}>Vehículo</label>
        <select value={formData.vehiculo_id} onChange={(e) => setFormData({...formData, vehiculo_id: e.target.value})} style={estiloInput} required>
          <option value="">Seleccione placa...</option>
          {listas.vehiculos.map(v => (
            <option key={`veh-${v.id_vehiculo}`} value={v.id_vehiculo}>{v.placa}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '600' }}>Origen</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="button" onClick={() => setOrigen('agente')} style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: 'none', backgroundColor: origen === 'agente' ? '#0f172a' : '#e2e8f0', color: origen === 'agente' ? '#fff' : '#475569', cursor: 'pointer' }}>Agente</button>
          <button type="button" onClick={() => setOrigen('camara')} style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: 'none', backgroundColor: origen === 'camara' ? '#0f172a' : '#e2e8f0', color: origen === 'camara' ? '#fff' : '#475569', cursor: 'pointer' }}>Cámara</button>
        </div>
      </div>

      {origen === 'agente' ? (
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '600' }}>Agente Responsable</label>
          <select value={formData.agente_id} onChange={(e) => setFormData({...formData, agente_id: e.target.value})} style={estiloInput} required>
            <option value="">Seleccione agente...</option>
            {listas.agentes.map(a => (
              <option key={`age-${a.id_agente}`} value={a.id_agente}>{a.nombre}</option>
            ))}
          </select>
        </div>
      ) : (
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '600' }}>Cámara Detectora</label>
          <select value={formData.camara_id} onChange={(e) => setFormData({...formData, camara_id: e.target.value})} style={estiloInput} required>
            <option value="">Seleccione cámara...</option>
            {listas.camaras.map(c => (
              <option key={`cam-${c.id_camara}`} value={c.id_camara}>{c.codigo}</option>
            ))}
          </select>
        </div>
      )}

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '600' }}>Fecha</label>
        <input type="datetime-local" value={formData.fecha_infraccion} onChange={(e) => setFormData({...formData, fecha_infraccion: e.target.value})} style={estiloInput} required />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '600' }}>Valor</label>
        <input type="number" value={formData.valor} onChange={(e) => setFormData({...formData, valor: e.target.value})} style={estiloInput} required />
      </div>

      <div style={{ marginBottom: '1.2rem' }}>
        <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '600' }}>Descripción</label>
        <textarea value={formData.descripcion} onChange={(e) => setFormData({...formData, descripcion: e.target.value})} style={{...estiloInput, height: '60px', resize: 'none'}} required />
      </div>

      <button type="submit" className="nav-chip is-active" style={{ width: '100%', border: 'none', cursor: 'pointer', padding: '0.8rem', fontWeight: 'bold' }}>
        {datosEdicion ? 'Actualizar' : 'Registrar'}
      </button>
    </form>
  );
};

export default FormInfraccion;