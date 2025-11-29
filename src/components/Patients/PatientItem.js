import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Patient.css";


import "../../styles/Patient.css";

const PatientItem = ({ patient, onDelete }) => {
  const handleDelete = async () => {
    if (!window.confirm("¿Eliminar paciente?")) return;

    const res = await fetch(
      `http://localhost:5000/api/patients/${patient._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!res.ok) return alert("Error eliminando paciente");

    if (onDelete) onDelete(patient._id);
  };

  return (
    <div className="patient-card">
      <div className="patient-head">
        <div className="patient-avatar">
          {patient.firstName.charAt(0).toUpperCase()}
        </div>

        <div className="patient-meta">
          <h3>{patient.firstName} {patient.lastName}</h3>
        </div>
      </div>

      <div className="patient-actions">
        <Link to={`/patients/${patient._id}`} className="details-btn">
          Ver detalles
        </Link>

        <button className="delete-btn" onClick={handleDelete}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default PatientItem;
