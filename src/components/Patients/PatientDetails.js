import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/Patient.css";


const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/patients/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPatient(data));
  }, [id]);

  if (!patient) return <p>Cargando...</p>;

  return (
    <div className="patient-details">
      <h1>{patient.firstName} {patient.lastName}</h1>

      <details>
        <summary>Diagnóstico</summary>
        <p>{patient.diagnosis || "Sin información"}</p>
      </details>

      <details>
        <summary>Medicación</summary>
        <p>{patient.medication || "Sin información"}</p>
      </details>

      <details>
        <summary>Días ingresado</summary>
        <p>{patient.admissionDays || "No especificado"}</p>
      </details>

      <details>
        <summary>Observaciones</summary>
        <p>{patient.observations || "Sin observaciones"}</p>
      </details>
    </div>
  );
};

export default PatientDetails;
