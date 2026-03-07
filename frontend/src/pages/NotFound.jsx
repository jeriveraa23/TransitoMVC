import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section>
      <h2>Ruta no encontrada</h2>
      <p>La pagina solicitada no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </section>
  );
}

export default NotFound;
