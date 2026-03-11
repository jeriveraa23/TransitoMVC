import { useState } from "react";

const FormReporte = ({ onBuscar }) => {

  const [texto, setTexto] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onBuscar(texto);
  };

  return (
    <form onSubmit={handleSubmit}>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "6px", fontWeight: "600" }}>
          Placa o documento del propietario
        </label>

        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Ingrese placa o documento"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #cbd5e1"
          }}
          required
        />
      </div>

      <button
        type="submit"
        className="nav-chip is-active"
        style={{
          width: "100%",
          padding: "10px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Buscar
      </button>

    </form>
  );
};

export default FormReporte;