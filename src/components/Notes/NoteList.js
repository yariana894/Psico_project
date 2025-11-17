import React from "react";
import "../../styles/Notelist.css";

const NoteList = ({ notes, setNotes }) => {
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta nota?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!response.ok) throw new Error("Error al eliminar la nota");
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <aside className="note-list">
      <h2 className="nl-title">Tus Notas</h2>
      <ul className="notes-container">
        {notes.map((note) => (
          <li key={note._id || note.tempId || Date.now()} className="note-card">
            <div className="note-head">
              <div className="note-avatar">
                {(note.title || "N").charAt(0).toUpperCase()}
              </div>
              <div className="note-meta">
                <h3 className="note-title">{note.title}</h3>
                <time className="note-time">
                  {note.createdAt
                    ? new Date(note.createdAt).toLocaleString()
                    : ""}
                </time>
              </div>
            </div>
            <p className="note-body">{note.description}</p>
            <div className="note-actions">
              <button
                className="delete-btn"
                onClick={() => handleDelete(note._id)}
              >
                🗑️ Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default NoteList;
