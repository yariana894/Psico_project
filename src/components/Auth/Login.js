import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.success) {
      localStorage.setItem("token", data.token);
      navigate("/notes");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="login-page">
      {/* 🎬 VIDEO DE FONDO */}
      <video autoPlay muted loop className="video-bg">
        <source src="/assets/videos/Arboles.mp4" type="video/mp4" />
      </video>

      {/* FORMULARIO */}
      <div className="auth-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
        <p className="text-muted">
          ¿No tienes cuenta? <Link to="/register">Créala ahora</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
