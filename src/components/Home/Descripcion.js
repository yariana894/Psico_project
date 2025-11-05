import React from "react";
import "../../styles/Descripcion.css";

const Descripcion = () => {
  return (
    <section className="descripcion">
      <div className="texto">
        <h2>Conoce tu mente</h2>
        <p>
          La psicología te ayuda a entender tus emociones, tus pensamientos y tu comportamiento.
          Explora técnicas científicas para alcanzar el equilibrio personal y emocional.
        </p>
      </div>
      <div className="imagen">
        <img src="/assets/images/psico2.jpg" alt="Psicología" />
      </div>
    </section>
  );
};

export default Descripcion;
