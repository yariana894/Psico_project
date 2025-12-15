import React, { useState } from "react";
import "../../styles/Patient.css";

const PatientForm = ({ onPatientAdded }) => {
  const [formData, setFormData] = useState({
    photoUrl: "",
    firstName: "",
    lastName: "",
    age: "",
    phone: "",
    email: "",
    address: "",
    diagnosis: "",
    medication: "",
    admissionDays: "",
    allergies: "",
    observations: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const newPatient = await res.json();

    if (onPatientAdded) onPatientAdded(newPatient);

    // Resetear formulario
    setFormData({
      photoUrl: "",
      firstName: "",
      lastName: "",
      age: "",
      phone: "",
      email: "",
      address: "",
      diagnosis: "",
      medication: "",
      admissionDays: "",
      allergies: "",
      observations: "",
    });
  };

  return (
    <form className="patient-form" onSubmit={handleSubmit}>
      
      <h3>Añadir nuevo paciente</h3>

      <input
        type="text"
        name="photoUrl"
        placeholder="URL de la foto"
        value={formData.photoUrl}
        onChange={handleChange}
      />

      <input
        type="text"
        name="firstName"
        placeholder="Nombre"
        value={formData.firstName}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="lastName"
        placeholder="Apellido"
        value={formData.lastName}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="age"
        placeholder="Edad"
        value={formData.age}
        onChange={handleChange}
      />

      <input
        type="text"
        name="phone"
        placeholder="Teléfono"
        value={formData.phone}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="text"
        name="address"
        placeholder="Dirección"
        value={formData.address}
        onChange={handleChange}
      />

      <input
        type="text"
        name="diagnosis"
        placeholder="Diagnóstico"
        value={formData.diagnosis}
        onChange={handleChange}
      />

      <input
        type="text"
        name="medication"
        placeholder="Medicación"
        value={formData.medication}
        onChange={handleChange}
      />

      <input
        type="number"
        name="admissionDays"
        placeholder="Días ingresado"
        value={formData.admissionDays}
        onChange={handleChange}
      />

      <input
        type="text"
        name="allergies"
        placeholder="Alergias"
        value={formData.allergies}
        onChange={handleChange}
      />

      <textarea
        name="observations"
        placeholder="Observaciones"
        value={formData.observations}
        onChange={handleChange}
      ></textarea>

      <button type="submit">Añadir Paciente</button>
    </form>
  );
};

export default PatientForm;
