import { NavLink, Outlet } from 'react-router-dom';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/propietarios', label: 'Propietarios' },
  { to: '/vehiculos', label: 'Vehiculos' },
  { to: '/agentes', label: 'Agentes' },
  { to: '/camaras', label: 'Camaras' },
  { to: '/infracciones', label: 'Infracciones' },
  { to: '/reportes', label: 'Reportes' },
];

function AppLayout() {
  return (
    <div className="page-shell">
      <header className="topbar">
        <div>
          <div className="topbar-brand">
            <h1>Transito Sabaneta</h1>
            <img
              src="/escudo-sabaneta.png"
              alt="Escudo de Sabaneta"
              className="topbar-escudo"
            />
          </div>
          <p className="topbar-subtitle">Panel administrativo MVC</p>
        </div>
      </header>

      <nav className="nav-grid" aria-label="Navegacion principal">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) => `nav-chip ${isActive ? 'is-active' : ''}`}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <main className="content-panel">
        {/* Aquí es donde React Router muestra el contenido de cada página */}
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;