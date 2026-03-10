import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/common/AppLayout';
import Home from './pages/Home';
import PropietariosPage from './pages/PropietariosPage';
import VehiculosPage from './pages/VehiculosPage';
import AgentesPage from './pages/AgentesPage';
import CamarasPage from './pages/CamarasPage';
import InfraccionesPage from './pages/InfraccionesPage';
import NotFound from './pages/NotFound';
import ReportesPage from './pages/ReportesPage';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="propietarios" element={<PropietariosPage />} />
          <Route path="vehiculos" element={<VehiculosPage />} />
          <Route path="agentes" element={<AgentesPage />} />
          <Route path="camaras" element={<CamarasPage />} />
          <Route path="infracciones" element={<InfraccionesPage />} />
          <Route path="reportes" element={<ReportesPage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
