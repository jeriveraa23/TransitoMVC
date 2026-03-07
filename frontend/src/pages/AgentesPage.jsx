import { useEffect, useState } from 'react';
import { agenteService } from '../services/agenteService';

const initialForm = {
  identificacion: '',
  nombre: '',
};

function AgentesPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      setError('');
      const data = await agenteService.list();
      setItems(data);
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo cargar agentes');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await agenteService.create(form);
      setForm(initialForm);
      await loadData();
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo crear agente');
    }
  };

  const handleDelete = async (id) => {
    try {
      await agenteService.remove(id);
      await loadData();
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo eliminar agente');
    }
  };

  return (
    <section className="module-grid">
      <div className="card">
        <h2>Nuevo agente</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <input
            placeholder="Identificacion"
            value={form.identificacion}
            onChange={(e) => setForm({ ...form, identificacion: e.target.value })}
          />
          <input
            placeholder="Nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
          <button type="submit">Guardar</button>
        </form>
      </div>

      <div className="card">
        <h2>Listado</h2>
        {error && <p className="error-msg">{error}</p>}
        <ul className="item-list">
          {items.map((item) => (
            <li key={item.id_agente}>
              <div>
                <strong>{item.nombre}</strong>
                <span>{item.identificacion}</span>
              </div>
              <button type="button" onClick={() => handleDelete(item.id_agente)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default AgentesPage;
