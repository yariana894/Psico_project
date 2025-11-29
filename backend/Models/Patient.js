import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    // A qué psicólogo pertenece este paciente
    psychologistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Datos básicos
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    photoUrl: { type: String }, // guardar la URL de la foto

    // Información clínica
    diagnosis: { type: String },       // trastorno
    medication: { type: String },      // medicación que toma
    admissionDays: { type: Number },   // días ingresado
    allergies: { type: String },       // opcional
    observations: { type: String },    // comentarios libre

    // Datos opcionales
    age: { type: Number },
    phone: { type: String },
    email: { type: String },
    address: { type: String },
  }
);

export default mongoose.model("Patient", PatientSchema);
