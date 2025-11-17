import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/Header.css";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate(); // <-- para redirigir después de cerrar sesión

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token"); // <-- borra el token
    navigate("/login"); // <-- redirige al login
  };

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-left">
        <Link className="logo" to="/">
          PSICO
        </Link>
      </div>
      <div className="header-right">
        <a href="/notes" className="nav-link">
          Notas
        </a>

        {/* Si no hay token, mostrar icono de login */}
        {!localStorage.getItem("token") && (
          <Link to="/login">
            <img
              src="/assets/images/icono_login.svg"
              alt="Inicio sesión"
              className="user-icon"
            />
          </Link>
        )}

        {/* Si hay token, mostrar botón de cerrar sesión */}
        {localStorage.getItem("token") && (
          <button onClick={handleLogout} className="nav-link logout-button">
            Cerrar sesión
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
