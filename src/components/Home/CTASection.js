import "../../styles/CTA.css";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="cta">
      <h2>¿Listo para comenzar?</h2>
      <p>Gestiona tus pacientes de forma profesional y segura.</p>
      <Link to="/register" className="cta-btn">
        Crear cuenta
      </Link>
    </section>
  );
};

export default CTASection;
