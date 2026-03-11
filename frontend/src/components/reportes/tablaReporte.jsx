const TablaReporte = ({ lista }) => {

  if (!lista || lista.length === 0) {
    return <p>No se encontraron infracciones.</p>;
  }

  const totalInfracciones = lista.length;

  const totalValor = lista.reduce((acc, i) => {
    return acc + Number(i.valor);
  }, 0);

  return (
    <div>

      <h2 style={{ marginBottom: "10px" }}>
        Listado de Infracciones
      </h2>

      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: "20px"
      }}>

        <thead style={{ backgroundColor: "#f1f5f9" }}>
          <tr>
            <th>Placa</th>
            <th>Propietario</th>
            <th>Fecha</th>
            <th>Valor</th>
            <th>Descripción</th>
          </tr>
        </thead>

        <tbody>
          {lista.map((i) => (
            <tr key={i.id_infraccion}>

              <td>{i.placa}</td>

              <td>{i.identificacion_propietario}</td>

              <td>
                {new Date(i.fecha_infraccion).toLocaleDateString()}
              </td>

              <td>
                ${Number(i.valor).toLocaleString()}
              </td>

              <td>{i.descripcion}</td>

            </tr>
          ))}
        </tbody>

      </table>

      <div style={{
        padding: "12px",
        backgroundColor: "#f8fafc",
        borderRadius: "8px",
        border: "1px solid #e2e8f0"
      }}>

        <strong>Total de infracciones:</strong> {totalInfracciones}

        <br />

        <strong>Total a pagar:</strong> ${totalValor.toLocaleString()}

      </div>

    </div>
  );
};

export default TablaReporte;