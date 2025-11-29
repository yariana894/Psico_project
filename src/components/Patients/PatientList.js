import React, { useEffect, useState } from "react";
import PatientForm from "./PatientForm";
import PatientItem from "./PatientItem";
import "../../styles/Patient.css";

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  // Obtener pacientes al cargar
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/patients", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();

        // Ajusta según lo que devuelve tu backend:
        // Si devuelve { patients: [...] } usa data.patients
        // Si devuelve directamente [...] usa data
        setPatients(Array.isArray(data) ? data : data.patients || []);
      } catch (err) {
        console.error("Error al cargar pacientes:", err);
      }
    };

    fetchPatients();
  }, []);

  // Cuando se crea un paciente, se agrega a la lista
  const handlePatientAdded = (newPatient) => {
    setPatients([...patients, newPatient]);
  };

  // Cuando se elimina un paciente
  const handlePatientDeleted = (id) => {
    setPatients(patients.filter((p) => p._id !== id));
  };

  return (
    <div className="patients-page">
      <h2>Tus pacientes</h2>

      <PatientForm onPatientAdded={handlePatientAdded} />

      <div className="patients-container">
        {Array.isArray(patients) && patients.map((patient) => (
          <PatientItem
            key={patient._id}
            patient={patient}
            onDelete={handlePatientDeleted}
          />
        ))}
      </div>
    </div>
  );
};

export default PatientList;
