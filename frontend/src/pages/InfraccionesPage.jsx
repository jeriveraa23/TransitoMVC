import { useEffect, useState } from 'react';
import { infraccionService } from '../services/infraccionService';

const initialForm = {
  vehiculo_id: '',
  fecha_infraccion: '',
  descripcion: '',
  valor: '',
  agente_id: '',
  camara_id: '',
};

function InfraccionesPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      setError('');
      const data = await infraccionService.list();
      setItems(data);
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo cargar infracciones');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        vehiculo_id: Number(form.vehiculo_id),
        fecha_infraccion: form.fecha_infraccion,
        descripcion: form.descripcion,
        valor: Number(form.valor),
      };

      if (form.agente_id) payload.agente_id = Number(form.agente_id);
      if (form.camara_id) payload.camara_id = Number(form.camara_id);

      await infraccionService.create(payload);
      setForm(initialForm);
      await loadData();
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo crear infraccion');
    }
  };

  const handleDelete = async (id) => {
    try {
      await infraccionService.remove(id);
      await loadData();
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo eliminar infraccion');
    }
  };

  return (
    <section className="module-grid">
      <div className="card">
        <h2>Nueva infraccion</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <input
            type="number"
            placeholder="ID vehiculo"
            value={form.vehiculo_id}
            onChange={(e) => setForm({ ...form, vehiculo_id: e.target.value })}
          />
          <input
            type="date"
            value={form.fecha_infraccion}
            onChange={(e) => setForm({ ...form, fecha_infraccion: e.target.value })}
          />
          <input
            placeholder="Descripcion"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          />
          <input
            type="number"
            placeholder="Valor"
            value={form.valor}
            onChange={(e) => setForm({ ...form, valor: e.target.value })}
          />
          <input
            type="number"
            placeholder="Agente ID (opcional)"
            value={form.agente_id}
            onChange={(e) => setForm({ ...form, agente_id: e.target.value })}
          />
          <input
            type="number"
            placeholder="Camara ID (opcional)"
            value={form.camara_id}
            onChange={(e) => setForm({ ...form, camara_id: e.target.value })}
          />
          <button type="submit">Guardar</button>
        </form>
      </div>

      <div className="card">
        <h2>Listado</h2>
        {error && <p className="error-msg">{error}</p>}
        <ul className="item-list">
          {items.map((item) => (
            <li key={item.id_infraccion}>
              <div>
                <strong>{item.placa}</strong>
                <span>{item.descripcion} - ${item.valor}</span>
              </div>
              <button type="button" onClick={() => handleDelete(item.id_infraccion)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default InfraccionesPage;
