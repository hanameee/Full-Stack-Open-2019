import React, { useState, useEffect } from "react";
import Note from "./Components/Note";
import axios from "axios";
import noteService from "./Services/notes";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [showAll, setShowAll] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:3001/notes").then(returnedData => {
            setNotes(returnedData);
        });
    }, []);

    const notesToShow = showAll ? notes : notes.filter(note => note.important);

    const rows = () =>
        notesToShow.map(note => (
            <Note
                note={note}
                toggleImportance={() => toggleImportanceOf(note.id)}
            />
        ));

    const handleNoteChange = event => {
        setNewNote(event.target.value);
    };

    const toggleImportanceOf = id => {
        const note = notes.find(note => note.id === id);
        const changedNote = { ...note, important: !note.important };
        noteService
            .update(note.id, changedNote)
            .then(returnedNote =>
                setNotes(
                    notes.map(note => (note.id !== id ? note : returnedNote))
                )
            );
    };
    const addNote = event => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5
        };
        noteService.create(noteObject).then(returnedNote => {
            setNotes(notes.concat(returnedNote));
            setNewNote("");
        });
    };

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? "important" : "all"}
                </button>
            </div>
            <ul>{rows()}</ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>
        </div>
    );
};

export default App;
