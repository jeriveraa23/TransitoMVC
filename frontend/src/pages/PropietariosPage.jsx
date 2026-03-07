import { useEffect, useState } from 'react';
import { propietarioService } from '../services/propietarioService';

const initialForm = {
  tipo_propietario: 'persona',
  identificacion: '',
  nombre: '',
  direccion: '',
};

function PropietariosPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      setError('');
      const data = await propietarioService.list();
      setItems(data);
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo cargar propietarios');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setError('');
      await propietarioService.create(form);
      setForm(initialForm);
      await loadData();
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo crear propietario');
    }
  };

  const handleDelete = async (id) => {
    try {
      setError('');
      await propietarioService.remove(id);
      await loadData();
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo eliminar propietario');
    }
  };

  return (
    <section className="module-grid">
      <div className="card">
        <h2>Nuevo propietario</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <select
            value={form.tipo_propietario}
            onChange={(e) => setForm({ ...form, tipo_propietario: e.target.value })}
          >
            <option value="persona">persona</option>
            <option value="empresa">empresa</option>
          </select>
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
          <input
            placeholder="Direccion"
            value={form.direccion}
            onChange={(e) => setForm({ ...form, direccion: e.target.value })}
          />
          <button type="submit">Guardar</button>
        </form>
      </div>

      <div className="card">
        <h2>Listado</h2>
        {error && <p className="error-msg">{error}</p>}
        <ul className="item-list">
          {items.map((item) => (
            <li key={item.id_propietario}>
              <div>
                <strong>{item.nombre}</strong>
                <span>{item.tipo_propietario} - {item.identificacion}</span>
              </div>
              <button type="button" onClick={() => handleDelete(item.id_propietario)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default PropietariosPage;
