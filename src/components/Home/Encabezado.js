import React from "react";
import "../../styles/Encabezado.css";

const Encabezado = () => {
  return (
    <section className="encabezado">
      <video
        className="video-fondo"
        src="/assets/videos/Arboles.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="overlay">
        <h1>Bienvenido a PSICO</h1>
        <p>Explora el poder de la mente y el bienestar emocional</p>
      </div>
    </section>
  );
};

export default Encabezado;
