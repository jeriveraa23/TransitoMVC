import React, { useState, useEffect } from 'react';
import { vehiculoService } from '../../services/vehiculoService';
import { propietarioService } from '../../services/propietarioService';

const MAX_IMAGE_MB = 2;

const FormVehiculo = ({ onVehiculoCreated, datosEdicion, onCancel }) => {
  const [propietarios, setPropietarios] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState('');
  const [formData, setFormData] = useState({
    placa: '',
    marca: '',
    fecha_matricula: '',
    tipo_vehiculo: 'automovil',
    propietario_id: '',
    imagen: ''
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
        fecha_matricula: String(datosEdicion.fecha_matricula).split('T')[0],
        tipo_vehiculo: datosEdicion.tipo_vehiculo,
        propietario_id: datosEdicion.propietario_id,
        imagen: ''
      });
      setImagePreview(null);
      setImageError('');
    }
  }, [datosEdicion]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setImageError('Solo se permiten archivos de tipo imagen.');
      return;
    }

    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      setImageError(`La imagen no puede superar ${MAX_IMAGE_MB} MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const imageDataUrl = String(reader.result || '');
      setFormData((prev) => ({ ...prev, imagen: imageDataUrl }));
      setImagePreview(imageDataUrl);
      setImageError('');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (datosEdicion) {
        await vehiculoService.update(datosEdicion.id_vehiculo, formData);
        onVehiculoCreated("Vehículo actualizado correctamente");
      } else {
        await vehiculoService.create(formData);
        onVehiculoCreated("Vehículo registrado correctamente");
      }
      handleCancelar();
    } catch (error) {
      const message = error?.response?.status === 413
        ? `La imagen es demasiado pesada para enviarla. Usa una menor a ${MAX_IMAGE_MB} MB.`
        : (error?.response?.data?.errors?.[0]?.message || "Error al procesar el vehículo");
      onVehiculoCreated(message);
    }
  };

  const handleCancelar = () => {
    setFormData({ placa: '', marca: '', fecha_matricula: '', tipo_vehiculo: 'automovil', propietario_id: '', imagen: '' });
    setImagePreview(null);
    setImageError('');
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

      <div style={estiloGrupo}>
        <label style={estiloLabel}>Imagen del Vehículo (opcional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ ...estiloInput, padding: '0.55rem' }}
        />
        {imageError && (
          <p style={{ marginTop: '0.4rem', color: '#b91c1c', fontSize: '0.8rem' }}>{imageError}</p>
        )}
        {imagePreview && (
          <div style={{ marginTop: '0.6rem' }}>
            <img
              src={imagePreview}
              alt="Vista previa del vehiculo"
              style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #dbe4ee' }}
            />
          </div>
        )}
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