import React, { useState } from "react";
import "../../styles/NoteForm.css";

const NoteForm = ({ onNoteAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!title.trim() || !content.trim()) return;

  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:5000/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify({ title, description: content }),
  });

  const newNote = await response.json();

  if (onNoteAdded) onNoteAdded(newNote); // <- actualizar lista
  setTitle("");
  setContent("");
};

  return (
    <div className="note-form-container">
      <h2>Crear nueva nota</h2>
      <form className="note-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="note-input"
        />
        <textarea
          placeholder="Contenido"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="note-textarea"
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" className="note-submit-btn" disabled={loading}>
          {loading ? "Guardando..." : "Guardar nota"}
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
