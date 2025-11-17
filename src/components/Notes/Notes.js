import React, { useState, useEffect } from "react";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Obtener notas al cargar
  useEffect(() => {
    fetch("http://localhost:5000/api/notes", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  // Crear nueva nota
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, description }),
    });

    const newNote = await res.json();
    setNotes([...notes, newNote]);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="notes-page">
      <h2>Tus Notas</h2>

      <form onSubmit={handleSubmit} className="note-form">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button type="submit">Crear Nota</button>
      </form>

      <div className="note-list">
        {notes.map((note) => (
          <div key={note._id || note.tempId || Date.now()} className="note-item">
            <h3>{note.title}</h3>
            <p>{note.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
