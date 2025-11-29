import React, { useState } from "react";
import "../../styles/Patient.css";


const PatientForm = ({ onPatientAdded }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [medication, setMedication] = useState("");
  const [diagnosis, setDiagnosis] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        firstName,
        lastName,
        medication,
        diagnosis,
      }),
    });

    const newPatient = await res.json();

    // Pasamos el paciente creado arriba al padre
    if (onPatientAdded) onPatientAdded(newPatient);

    // Limpiar inputs
    setFirstName("");
    setLastName("");
    setMedication("");
    setDiagnosis("");
  };

  return (
    <form className="patient-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Apellido"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Diagnóstico"
        value={diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
      />

      <input
        type="text"
        placeholder="Medicación"
        value={medication}
        onChange={(e) => setMedication(e.target.value)}
      />

      <button type="submit">Añadir Paciente</button>
    </form>
  );
};

export default PatientForm;
