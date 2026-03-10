import React from 'react';

const ReportesPage = () => {
  return (
    <div className="container" style={{ padding: '20px' }}>
      <header style={{ marginBottom: '30px', borderBottom: '2px solid #eee' }}>
        <h1>📊 Centro de Reportes</h1>
        <p>Estadísticas de movilidad y propietarios de Sabaneta</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        {/* Placeholder para futuras gráficas */}
        <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #ddd' }}>
          <h3>Total Propietarios</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007bff' }}>--</p>
        </div>

        <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #ddd' }}>
          <h3>Infracciones Mes</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc3545' }}>--</p>
        </div>
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center', color: '#666' }}>
        <p>Integrando datos de Postgres y Docker...</p>
      </div>
    </div>
  );
};

export default ReportesPage;