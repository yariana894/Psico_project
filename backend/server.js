import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Patient from "./Models/Patient.js";
import User from "./Models/User.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Conexión MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.log("❌ Error de conexión:", err));

// Middleware token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Acceso denegado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.psychologistId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

//--------------------USUARIO----------------------------//

// Registro
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists)
    return res.json({
      success: false,
      message: "El correo ya está registrado",
    });

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashed });
  await user.save();

  res.json({ success: true, message: "Usuario registrado con éxito" });
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.json({ success: false, message: "Usuario no encontrado" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid)
    return res.json({ success: false, message: "Contraseña incorrecta" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  res.json({ success: true, token });
});

//----------------------PACIENTES---------------------//

// ✅ Obtener pacientes
app.get("/api/patients", verifyToken, async (req, res) => {
  try {
    const patients = await Patient.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.json(patients);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al obtener los pacientes" });
  }
});

// ✅ Obtener notas
/* app.get("/api/notes", verifyToken, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al obtener notas" });
  }
}); */

// Crear paciente
// Crear paciente
app.post("/api/patients", verifyToken, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      photoUrl,
      diagnosis,
      medication,
      admissionDays,
      allergies,
      observations,
      age,
      phone,
      email,
      address,
    } = req.body;

    const patient = new Patient({
      firstName,
      lastName,
      photoUrl,
      diagnosis,
      medication,
      admissionDays,
      allergies,
      observations,
      age,
      phone,
      email,
      address,

      psychologistId: req.psychologistId,
    });

    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    console.error("Error al crear paciente:", error);
    res.status(500).json({ message: "Error al crear paciente" });
  }
});

// Crear nota
/* app.post("/api/notes", verifyToken, async (req, res) => {
  const { title, description } = req.body;
  const note = new Note({ title, description, userId: req.userId });
  await note.save();
  res.json(note);
}); */

// Actualizar nota
/* app.put("/api/notes/:id", verifyToken, async (req, res) => {
  const { title, description } = req.body;
  const updatedNote = await Note.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    { title, description },
    { new: true }
  );
  res.json({ success: true, note: updatedNote });
}); */

// Eliminar nota
/* app.delete("/api/notes/:id", verifyToken, async (req, res) => {
  await Note.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ success: true });
}); */

//-----------------SERVIDOR-----------------//

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
