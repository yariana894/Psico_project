import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/PatientDetails.css";

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ NUEVO: imagen local seleccionada
  const [localImage, setLocalImage] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `http://localhost:5000/api/patients/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Error ${res.status}`);
        }

        const data = await res.json();

        console.log("Paciente recibido:", data);

        setPatient(data.patient || data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar el paciente.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  /* =================== RENDER =================== */

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="patient-details-container">
      
      {/* Tarjeta principal */}
      <div className="patient-card">

        {/* Foto */}
        <div className="patient-photo">
          <img
            src={
              localImage ||
              (patient.photo
                ? `http://localhost:5000/${patient.photo}`
                : "/assets/images/default-user.png")
            }
            alt={`${patient.firstName} ${patient.lastName}`}
          />

          {/* ✅ NUEVO: explorar archivos */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setLocalImage(URL.createObjectURL(file));
              }
            }}
          />
        </div>

        {/* Información básica */}
        <div className="patient-info">
          <h2>
            {patient.firstName} {patient.lastName}
          </h2>

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

        <button className="btn-edit">
          ✏ Editar
        </button>

        <button className="btn-delete">
          🗑 Eliminar
        </button>
      </div>
    </div>
  );
};

export default PatientDetails;
