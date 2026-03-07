import { useEffect, useState } from 'react';
import { camaraService } from '../services/camaraService';

const initialForm = {
  codigo: '',
  ubicacion: '',
};

function CamarasPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      setError('');
      const data = await camaraService.list();
      setItems(data);
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo cargar camaras');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await camaraService.create(form);
      setForm(initialForm);
      await loadData();
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo crear camara');
    }
  };

  const handleDelete = async (id) => {
    try {
      await camaraService.remove(id);
      await loadData();
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo eliminar camara');
    }
  };

  return (
    <section className="module-grid">
      <div className="card">
        <h2>Nueva camara</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <input
            placeholder="Codigo"
            value={form.codigo}
            onChange={(e) => setForm({ ...form, codigo: e.target.value })}
          />
          <input
            placeholder="Ubicacion"
            value={form.ubicacion}
            onChange={(e) => setForm({ ...form, ubicacion: e.target.value })}
          />
          <button type="submit">Guardar</button>
        </form>
      </div>

      <div className="card">
        <h2>Listado</h2>
        {error && <p className="error-msg">{error}</p>}
        <ul className="item-list">
          {items.map((item) => (
            <li key={item.id_camara}>
              <div>
                <strong>{item.codigo}</strong>
                <span>{item.ubicacion}</span>
              </div>
              <button type="button" onClick={() => handleDelete(item.id_camara)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default CamarasPage;
