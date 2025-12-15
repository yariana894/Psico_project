import { useState } from "react";
import "../../styles/InfoInteractiva.css";

const InfoInteractiva = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const items = [
    {
      pregunta: "¿Qué es Psico-Project?",
      respuesta:
        "Es una herramienta creada para que psicólogos gestionen pacientes, notas y evolución terapéutica.",
    },
    {
      pregunta: "¿Es seguro?",
      respuesta:
        "Sí, toda la información se guarda con protección mediante tokens JWT y reglas de acceso.",
    },
    {
      pregunta: "¿Qué puedo hacer?",
      respuesta:
        "Registrar pacientes, ver detalles, guardar notas, eliminar registros y mucho más.",
    },
  ];

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="acordeon">
      <h2>Información útil</h2>

      {items.map((item, i) => (
        <div key={i} className="acordeon-item">
          <button onClick={() => toggle(i)} className="acordeon-pregunta">
            {item.pregunta}
            <span>{openIndex === i ? "−" : "+"}</span>
          </button>

          <div
            className={`acordeon-respuesta ${
              openIndex === i ? "open" : ""
            }`}
          >
            <p>{item.respuesta}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default InfoInteractiva;
