function Home() {
  return (
    <section>
      <h2>Estado del proyecto</h2>
      <p>
        Backend y base de datos ya estan operativos. En esta fase el frontend consume la API REST
        para gestionar propietarios, vehiculos, agentes, camaras e infracciones.
      </p>
      <ul>
        <li>API base esperada: <code>http://localhost:3000/api</code></li>
        <li>Levanta backend y frontend en paralelo para probar flujos completos.</li>
        <li>Infraccion exige exactamente un origen: agente o camara.</li>
      </ul>
    </section>
  );
}

export default Home;
