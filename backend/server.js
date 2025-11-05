import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Note from "./Models/Note.js";
import User from "./Models/User.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// 🧷 Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.log("❌ Error de conexión:", err));

// 🔐 Middleware para verificar token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Acceso denegado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

// 📦 Registro
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.json({ success: false, message: "El correo ya está registrado" });

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashed });
  await user.save();

  res.json({ success: true, message: "Usuario registrado con éxito" });
});

// 🔑 Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json({ success: false, message: "Usuario no encontrado" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.json({ success: false, message: "Contraseña incorrecta" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
  res.json({ success: true, token });
});

// 🗒️ Obtener notas del usuario
app.get("/api/notes", verifyToken, async (req, res) => {
  const notes = await Note.find({ userId: req.userId });
  res.json(notes);
});

// ➕ Crear una nota
app.post("/api/notes", verifyToken, async (req, res) => {
  const { title, description } = req.body;
  const note = new Note({ title, description, userId: req.userId });
  await note.save();
  res.json({ success: true, note });
});

// 🗑️ Eliminar una nota
app.delete("/api/notes/:id", verifyToken, async (req, res) => {
  await Note.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ success: true });
});

// 🚀 Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
