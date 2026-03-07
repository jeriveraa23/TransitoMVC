import { useEffect, useState } from 'react';
import { vehiculoService } from '../services/vehiculoService';

const initialForm = {
  placa: '',
  marca: '',
  tipo_vehiculo: 'automovil',
  propietario_id: '',
};

function VehiculosPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      setError('');
      const data = await vehiculoService.list();
      setItems(data);
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo cargar vehiculos');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await vehiculoService.create({
        ...form,
        propietario_id: Number(form.propietario_id),
      });
      setForm(initialForm);
      await loadData();
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo crear vehiculo');
    }
  };

  const handleDelete = async (id) => {
    try {
      await vehiculoService.remove(id);
      await loadData();
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo eliminar vehiculo');
    }
  };

  return (
    <section className="module-grid">
      <div className="card">
        <h2>Nuevo vehiculo</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <input
            placeholder="Placa"
            value={form.placa}
            onChange={(e) => setForm({ ...form, placa: e.target.value })}
          />
          <input
            placeholder="Marca"
            value={form.marca}
            onChange={(e) => setForm({ ...form, marca: e.target.value })}
          />
          <select
            value={form.tipo_vehiculo}
            onChange={(e) => setForm({ ...form, tipo_vehiculo: e.target.value })}
          >
            <option value="automovil">automovil</option>
            <option value="moto">moto</option>
            <option value="carro_pesado">carro_pesado</option>
          </select>
          <input
            type="number"
            placeholder="ID propietario"
            value={form.propietario_id}
            onChange={(e) => setForm({ ...form, propietario_id: e.target.value })}
          />
          <button type="submit">Guardar</button>
        </form>
      </div>

      <div className="card">
        <h2>Listado</h2>
        {error && <p className="error-msg">{error}</p>}
        <ul className="item-list">
          {items.map((item) => (
            <li key={item.id_vehiculo}>
              <div>
                <strong>{item.placa}</strong>
                <span>{item.marca} - {item.tipo_vehiculo} - Propietario: {item.nombre_propietario}</span>
              </div>
              <button type="button" onClick={() => handleDelete(item.id_vehiculo)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default VehiculosPage;
