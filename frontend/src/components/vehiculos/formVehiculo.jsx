import React, { useState, useEffect } from 'react';
import { vehiculoService } from '../../services/vehiculoService';
import { propietarioService } from '../../services/propietarioService';

const FormVehiculo = ({ onVehiculoCreated, datosEdicion, onCancel }) => {
  const [propietarios, setPropietarios] = useState([]);
  const [formData, setFormData] = useState({
    placa: '',
    marca: '',
    fecha_matricula: '',
    tipo_vehiculo: 'automovil',
    propietario_id: ''
  });

  useEffect(() => {
    const cargarPropietarios = async () => {
      try {
        const data = await propietarioService.list();
        setPropietarios(data);
      } catch (error) {
        console.error("Error cargando propietarios", error);
      }
    };
    cargarPropietarios();
  }, []);

  useEffect(() => {
    if (datosEdicion) {
      setFormData({
        placa: datosEdicion.placa,
        marca: datosEdicion.marca,
        fecha_matricula: datosEdicion.fecha_matricula.split('T')[0],
        tipo_vehiculo: datosEdicion.tipo_vehiculo,
        propietario_id: datosEdicion.propietario_id
      });
    }
  }, [datosEdicion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (datosEdicion) {
        await vehiculoService.update(datosEdicion.id_vehiculo, formData);
        alert("✅ Vehículo actualizado");
      } else {
        await vehiculoService.create(formData);
        alert("✅ Vehículo registrado");
      }
      onVehiculoCreated();
      handleCancelar();
    } catch (error) {
      alert("❌ Error: " + (error.response?.data?.error || error.message));
    }
  };

  const handleCancelar = () => {
    setFormData({ placa: '', marca: '', fecha_matricula: '', tipo_vehiculo: 'automovil', propietario_id: '' });
    onCancel();
  };

  // Estilos rápidos para mejorar la apariencia sin CSS externo
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
        <label style={estiloLabel}>Placa</label>
        <input 
          type="text" 
          disabled={!!datosEdicion}
          value={formData.placa}
          onChange={(e) => setFormData({...formData, placa: e.target.value.toUpperCase()})}
          placeholder="Ej: ABC123"
          style={estiloInput}
          required 
        />
      </div>

      <div style={estiloGrupo}>
        <label style={estiloLabel}>Propietario</label>
        <select 
          value={formData.propietario_id}
          onChange={(e) => setFormData({...formData, propietario_id: e.target.value})}
          style={estiloInput}
          required
        >
          <option value="">Seleccione un dueño...</option>
          {propietarios.map(p => (
            <option key={p.id_propietario} value={p.id_propietario}>
              {p.nombre} ({p.identificacion})
            </option>
          ))}
        </select>
      </div>

      <div style={estiloGrupo}>
        <label style={estiloLabel}>Marca</label>
        <input 
          type="text" 
          value={formData.marca}
          onChange={(e) => setFormData({...formData, marca: e.target.value})}
          style={estiloInput}
          placeholder="Ej: Mazda, Yamaha..."
          required 
        />
      </div>

      <div style={estiloGrupo}>
        <label style={estiloLabel}>Tipo de Vehículo</label>
        <select 
          value={formData.tipo_vehiculo}
          onChange={(e) => setFormData({...formData, tipo_vehiculo: e.target.value})}
          style={estiloInput}
        >
          <option value="automovil">Automóvil</option>
          <option value="moto">Moto</option>
          <option value="carro_pesado">Carro Pesado</option>
        </select>
      </div>

      <div style={estiloGrupo}>
        <label style={estiloLabel}>Fecha de Matrícula</label>
        <input 
          type="date" 
          value={formData.fecha_matricula}
          onChange={(e) => setFormData({...formData, fecha_matricula: e.target.value})}
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
          {datosEdicion ? 'Actualizar Vehículo' : 'Registrar Vehículo'}
        </button>
        {datosEdicion && (
          <button 
            type="button" 
            onClick={handleCancelar} 
            style={{ flex: 1, backgroundColor: '#64748b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default FormVehiculo;