import { NavLink, Outlet } from 'react-router-dom';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/propietarios', label: 'Propietarios' },
  { to: '/vehiculos', label: 'Vehiculos' },
  { to: '/agentes', label: 'Agentes' },
  { to: '/camaras', label: 'Camaras' },
  { to: '/infracciones', label: 'Infracciones' },
];

function AppLayout() {
  return (
    <div className="page-shell">
      <header className="topbar">
        <div>
          <h1>Transito Sabaneta</h1>
          <p>Panel administrativo MVC</p>
        </div>
        <span className="tag">Fase 3 - Frontend</span>
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
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
