const TablaReporte = ({ lista }) => {

  if (!lista || lista.length === 0) {
    return (
      <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
        No se encontraron infracciones.
      </p>
    );
  }

  const totalInfracciones = lista.length;

  const totalValor = lista.reduce((acc, i) => {
    return acc + Number(i.valor);
  }, 0);

  return (
    <div>

      <h2 style={{
        marginBottom: "15px",
        fontSize: "1.2rem"
      }}>
        Listado de Infracciones
      </h2>

      <div style={{
        border: "1px solid #e2e8f0",
        borderRadius: "10px",
        overflow: "hidden"
      }}>

        <div style={{
          maxHeight: "380px",
          overflowY: "auto"
        }}>

          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.9rem"
          }}>

            <thead style={{
              backgroundColor: "#0f172a",
              color: "white"
            }}>
              <tr>

                <th style={estiloTh}>Placa</th>

                <th style={estiloTh}>Propietario</th>

                <th style={estiloTh}>Fecha</th>

                <th style={{
                  ...estiloTh,
                  textAlign: "right"
                }}>
                  Valor
                </th>

                <th style={estiloTh}>Descripción</th>

              </tr>
            </thead>

            <tbody>

              {lista.map((i, index) => (

                <tr
                  key={i.id_infraccion}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8fafc",
                    borderBottom: "1px solid #f1f5f9"
                  }}
                >

                  <td style={estiloTd}>{i.placa}</td>

                  <td style={estiloTd}>
                    {i.identificacion_propietario}
                  </td>

                  <td style={estiloTd}>
                    {new Date(i.fecha_infraccion).toLocaleDateString()}
                  </td>

                  <td style={{
                    ...estiloTd,
                    textAlign: "right",
                    fontWeight: "600"
                  }}>
                    ${Number(i.valor).toLocaleString()}
                  </td>

                  <td style={estiloTd}>
                    {i.descripcion}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      <div style={{
        marginTop: "15px",
        padding: "14px",
        backgroundColor: "#f8fafc",
        borderRadius: "10px",
        border: "1px solid #e2e8f0",
        fontSize: "0.9rem"
      }}>

        <div style={{ marginBottom: "5px" }}>
          <strong>Total de infracciones:</strong> {totalInfracciones}
        </div>

        <div style={{
          fontSize: "1rem",
          fontWeight: "600",
          color: "#0f172a"
        }}>
          Total a pagar: ${totalValor.toLocaleString()}
        </div>

      </div>

    </div>
  );
};

const estiloTh = {
  padding: "12px",
  textAlign: "left",
  fontWeight: "600",
  fontSize: "0.85rem"
};

const estiloTd = {
  padding: "10px",
  color: "#1e293b"
};

export default TablaReporte;