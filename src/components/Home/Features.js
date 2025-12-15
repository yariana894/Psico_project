import "../../styles/Features.css";

const Features = () => {
  const funcionalidades = [
    {
      titulo: "Gestión de Pacientes",
      texto: "Organiza tus pacientes de manera rápida y segura.",
      icono: "🧠",
    },
    {
      titulo: "Notas Clínicas",
      texto: "Crea y guarda notas vinculadas a cada paciente.",
      icono: "📝",
    },
    {
      titulo: "Privacidad y Seguridad",
      texto: "Tus datos están protegidos mediante autenticación JWT.",
      icono: "🔒",
    },
  ];

  return (
    <section className="features">
      <h2>¿Qué puedes hacer en ClinicData?</h2>

      <div className="features-grid">
        {funcionalidades.map((item, i) => (
          <div
            key={i}
            className="feature-card"
          >
            <span className="icon">{item.icono}</span>
            <h3>{item.titulo}</h3>
            <p>{item.texto}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
