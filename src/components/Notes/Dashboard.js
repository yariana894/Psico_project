import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Bienvenido a tu panel</h1>
      <p>Desde aquí puedes gestionar tus notas.</p>
      <Link to="/notes" className="btn-notes">Ir a Notas</Link>
    </div>
  );
};

export default Dashboard;
