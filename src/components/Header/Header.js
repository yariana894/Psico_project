import { Link } from "react-router-dom";
import "../../styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">PSICO</h1>
      </div>
      <div className="header-right">
        <a href="/notes" className="nav-link">
          Notas
        </a>
        <Link to="/login">
          <img
            src="/assets/images/icono_login.svg"
            alt="Inicio sesión"
            className="user-icon"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
