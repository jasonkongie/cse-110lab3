import React, { useState, useContext } from 'react';
import './App.css';
import { Label, Note } from './types';
import { dummyNotesList } from './constants';
import { ThemeContext, themes } from './ThemeContext';

export const StickyNotes = () => {
  const [notes, setNotes] = useState<Note[]>(dummyNotesList);

  const initialNote: Note = {
    id: -1,
    title: '',
    content: '',
    label: Label.other,
  };

  const [createNote, setCreateNote] = useState<Note>(initialNote);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const theme = currentTheme;

  const toggleTheme = () => {
    setCurrentTheme(
      currentTheme === themes.light ? themes.dark : themes.light
    );
  };

  const createNoteHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newNote: Note = {
      ...createNote,
      id: notes.length + 1,
    };

    setNotes([...notes, newNote]);
    setCreateNote(initialNote);
  };

  const handleDelete = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
    setFavorites(favorites.filter((favId) => favId !== id));
  };

  const handleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleUpdate = (id: number, field: string, value: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, [field]: value } : note
      )
    );
  };

  const saveNote = () => {
    if (selectedNote) {
      setNotes(
        notes.map((note) =>
          note.id === selectedNote.id ? selectedNote : note
        )
      );
      setSelectedNote(null);
    }
  };

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div
        className="app-container"
        style={{
          backgroundColor: theme.background,
          color: theme.foreground,
        }}
      >
        <button className="toggle-theme-button" onClick={toggleTheme}>
          Toggle Theme
        </button>

        <form
          className="note-form"
          onSubmit={createNoteHandler}
          style={{
            backgroundColor: theme.background,
            color: theme.foreground,
          }}
        >
          <div>
            <input
              placeholder="Note Title"
              value={createNote.title}
              onChange={(event) =>
                setCreateNote({ ...createNote, title: event.target.value })
              }
              required
              style={{
                backgroundColor: theme.inputBackground,
                color: theme.inputColor,
              }}
            />
          </div>

          <div>
            <textarea
              placeholder="Note Content"
              value={createNote.content}
              onChange={(event) =>
                setCreateNote({ ...createNote, content: event.target.value })
              }
              required
              style={{
                backgroundColor: theme.inputBackground,
                color: theme.inputColor,
              }}
            />
          </div>

          <div>
            <select
              value={createNote.label}
              onChange={(event) =>
                setCreateNote({
                  ...createNote,
                  label: event.target.value as Label,
                })
              }
              required
              style={{
                backgroundColor: theme.inputBackground,
                color: theme.inputColor,
              }}
            >
              <option value={Label.personal}>Personal</option>
              <option value={Label.study}>Study</option>
              <option value={Label.work}>Work</option>
              <option value={Label.other}>Other</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="create-note-button"
              style={{
                backgroundColor: theme.buttonBackground,
                color: theme.buttonColor,
              }}
            >
              Create Note
            </button>
          </div>
        </form>

        {selectedNote && (
          <div className="edit-form">
            <h3>Edit Note</h3>
            <input
              value={selectedNote.title}
              onChange={(e) =>
                setSelectedNote({ ...selectedNote, title: e.target.value })
              }
              style={{
                backgroundColor: theme.inputBackground,
                color: theme.inputColor,
              }}
            />
            <textarea
              value={selectedNote.content}
              onChange={(e) =>
                setSelectedNote({ ...selectedNote, content: e.target.value })
              }
              style={{
                backgroundColor: theme.inputBackground,
                color: theme.inputColor,
              }}
            />
            <select
              value={selectedNote.label}
              onChange={(e) =>
                setSelectedNote({
                  ...selectedNote,
                  label: e.target.value as Label,
                })
              }
              style={{
                backgroundColor: theme.inputBackground,
                color: theme.inputColor,
              }}
            >
              <option value={Label.personal}>Personal</option>
              <option value={Label.study}>Study</option>
              <option value={Label.work}>Work</option>
              <option value={Label.other}>Other</option>
            </select>
            <div className="edit-buttons">
              <button
                onClick={saveNote}
                style={{
                  backgroundColor: theme.buttonBackground,
                  color: theme.buttonColor,
                }}
              >
                Save
              </button>
              <button
                onClick={() => setSelectedNote(null)}
                style={{
                  backgroundColor: 'rgb(220, 89, 89)',
                  color: 'white',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="notes-grid">
          {notes.map((note) => (
            <div
              key={note.id}
              className="note-item"
              style={{
                backgroundColor: theme.noteBackground,
                color: theme.noteColor,
              }}
            >
              <div className="notes-header">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(note.id);
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    color: theme.noteColor,
                  }}
                >
                  x
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavorite(note.id);
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    color: theme.noteColor,
                  }}
                >
                  {favorites.includes(note.id) ? '💔' : '❤️'}
                </button>
              </div>
              <h2
                onClick={() => setSelectedNote(note)}
                style={{ cursor: 'pointer' }}
              >
                {note.title}
              </h2>
              <p>{note.content}</p>
              <p>{note.label}</p>
            </div>
          ))}
        </div>

        <div className="favorites-section">
          <h3>Favorite Notes:</h3>
          <ul>
            {notes
              .filter((note) => favorites.includes(note.id))
              .map((note) => (
                <li key={note.id}>{note.title}</li>
              ))}
          </ul>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default StickyNotes;