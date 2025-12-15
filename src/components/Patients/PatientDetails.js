import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/PatientDetails.css";

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/patients/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("No se pudo cargar el paciente");

        const data = await res.json();
        setPatient(data);
      } catch (err) {
        setError("Error al cargar el paciente.");
      }
    };

    fetchPatient();
  }, [id]);

  if (!patient) return <p>Cargando datos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="patient-details-container">
      {/* Tarjeta principal */}
      <div className="patient-card">
        
        {/* Foto */}
        <div className="patient-photo">
          <img 
            src={patient.photoUrl || "/assets/images/default-user.png"} 
            alt={`${patient.firstName} ${patient.lastName}`} 
          />
        </div>

        {/* Info básica */}
        <div className="patient-info">
          <h2>{patient.firstName} {patient.lastName}</h2>
          {patient.age && <p><strong>Edad:</strong> {patient.age}</p>}
          {patient.phone && <p><strong>Teléfono:</strong> {patient.phone}</p>}
          {patient.email && <p><strong>Email:</strong> {patient.email}</p>}
          {patient.address && <p><strong>Dirección:</strong> {patient.address}</p>}
        </div>
      </div>

      {/* Información clínica */}
      <div className="clinical-data">
        <h3>Información clínica</h3>

        {patient.diagnosis && (
          <p><strong>Diagnóstico:</strong> {patient.diagnosis}</p>
        )}
        {patient.medication && (
          <p><strong>Medicación:</strong> {patient.medication}</p>
        )}
        {patient.admissionDays && (
          <p><strong>Días de ingreso:</strong> {patient.admissionDays}</p>
        )}
        {patient.allergies && (
          <p><strong>Alergias:</strong> {patient.allergies}</p>
        )}
        {patient.observations && (
          <p><strong>Observaciones:</strong> {patient.observations}</p>
        )}
      </div>

      {/* Botones */}
      <div className="details-buttons">
        <button onClick={() => navigate("/patients")} className="btn-back">
          ⬅ Volver
        </button>

        <button onClick={() => alert("Función de editar pendiente")} className="btn-edit">
          ✏ Editar
        </button>

        <button onClick={() => alert("Eliminar aquí")} className="btn-delete">
          🗑 Eliminar
        </button>
      </div>
    </div>
  );
};

export default PatientDetails;
