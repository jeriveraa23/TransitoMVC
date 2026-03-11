import { useState } from "react";
import FormReporte from "../components/reportes/formReporte";
import TablaReporte from "../components/reportes/tablaReporte";
import { infraccionService } from "../services/infraccionService";

const ReportesPage = () => {

  const [lista, setLista] = useState([]);

  const buscar = async (texto) => {

    try {

      const data = await infraccionService.list();

      const resultado = data.filter((i) => {

        return (
          i.placa.toLowerCase().includes(texto.toLowerCase()) ||
          i.identificacion_propietario.includes(texto)
        );

      });

      setLista(resultado);

    } catch (error) {

      console.error("Error al buscar infracciones", error);

    }

  };

  return (
    <div className="page-shell">

      <div className="topbar">
        <div>
          <h1>Reportes</h1>
          <p>Consultar infracciones por placa o propietario</p>
        </div>
      </div>

      <div className="content-panel">

        <div className="module-grid">

          <div className="card">

            <h2 style={{ marginBottom: "15px" }}>
              Buscar infracciones
            </h2>

            <FormReporte onBuscar={buscar} />

          </div>

          <div className="card">

            <TablaReporte lista={lista} />

          </div>

        </div>

      </div>

    </div>
  );
};

export default ReportesPage;