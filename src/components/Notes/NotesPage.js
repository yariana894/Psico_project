import React, { useState, useEffect } from "react";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import "../../styles/Notelist.css";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Cargar notas al inicio
  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/notes", {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        if (!res.ok) throw new Error("Error al cargar notas");
        const data = await res.json();
        setNotes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="notes-page">
      <NoteForm
        onNoteAdded={(newNote) => setNotes([...notes, newNote])}
      />

      {loading && <p className="nl-loading">Cargando notas...</p>}
      {error && <p className="nl-error">{error}</p>}
      {!loading && !error && notes.length === 0 && (
        <p className="nl-empty">No hay notas aún.</p>
      )}

      <NoteList notes={notes} setNotes={setNotes} />
    </div>
  );
};

export default NotesPage;
