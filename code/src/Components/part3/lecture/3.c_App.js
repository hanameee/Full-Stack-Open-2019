import React, { useState, useEffect } from "react";
import Note from "./Components/Note";
import noteService from "./Services/notes";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [showAll, setShowAll] = useState(true);

    useEffect(() => {
        noteService.getAll().then(returnedData => {
            setNotes(returnedData);
        });
    }, []);

    const notesToShow = showAll ? notes : notes.filter(note => note.important);

    const rows = () => {
        return notesToShow.map(note => (
            <Note
                note={note}
                toggleImportance={() => toggleImportanceOf(note.id)}
                getSpecific={() => noteService.getSpecific(note.id)}
                removeOf={() => removeOf(note.id)}
            />
        ));
    };
    const handleNoteChange = event => {
        setNewNote(event.target.value);
    };

    const toggleImportanceOf = id => {
        const note = notes.find(note => note.id === id);
        const changedNote = { ...note, important: !note.important };
        noteService
            .update(note.id, changedNote)
            .then(returnedNote => {
                setNotes(
                    notes.map(note => (note.id !== id ? note : returnedNote))
                );
            })
            .catch(error => {
                console.log(error);
                alert(
                    `the note '${note.content}' was already deleted from server`
                );
                setNotes(notes.filter(n => n.id !== id));
            });
    };

    const removeOf = id => {
        const note = notes.find(note => note.id === id);
        noteService
            .remove(note.id)
            .then(() => setNotes(notes.filter(note => note.id !== id)));
    };
    const addNote = event => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5
        };
        noteService.create(noteObject).then(returnedNote => {
            console.log(returnedNote, "얍");
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
