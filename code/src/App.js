import React, { useState, useEffect } from "react";

import Note from "./Components/Note";
import noteService from "./Services/notes";
import loginService from "./Services/login";
import Notification from "./Components/Notification";
import "./App.css";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [showAll, setShowAll] = useState(true);
    const initialMessage = {
        content: "",
        type: null
    };
    const [message, setMessage] = useState(initialMessage);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username{" "}
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => {
                        setUsername(target.value);
                    }}
                    autoComplete="false"
                />
            </div>
            <div>
                password{" "}
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    );

    const noteForm = () => (
        <form onSubmit={addNote}>
            <input value={newNote} onChange={handleNoteChange} />
            <button type="submit">save</button>
        </form>
    );

    useEffect(() => {
        noteService.getAll().then(initialNotes => {
            setNotes(initialNotes);
        });
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
        if (loggedUserJSON) {
            const User = JSON.parse(loggedUserJSON);
            setUser(User);
            noteService.setToken(User.token);
        }
    }, []);

    const addNote = event => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
            id: notes.length + 1
        };

        noteService.create(noteObject).then(returnedNote => {
            setNotes(notes.concat(returnedNote));
            setNewNote("");
        });
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
                setMessage({
                    content: `Note '${note.content}' was already deleted from server`,
                    type: "warning"
                });
                setTimeout(() => {
                    setMessage(initialMessage);
                }, 5000);
                setNotes(notes.filter(n => n.id !== id));
            });
    };

    const handleLogin = async event => {
        event.preventDefault();
        try {
            const User = await loginService.login({ username, password });
            window.localStorage.setItem(
                "loggedNoteappUser",
                JSON.stringify(User)
            );
            noteService.setToken(User.token);
            setUser(User);
            setUsername("");
            setPassword("");
        } catch (exception) {
            setMessage({
                content: "Wrong credentials",
                type: "warning"
            });
            setTimeout(() => {
                setMessage(initialMessage);
            }, 5000);
        }
    };

    const handleNoteChange = event => {
        setNewNote(event.target.value);
    };

    const notesToShow = showAll ? notes : notes.filter(note => note.important);

    const rows = () => {
        return notesToShow.map((note, i) => (
            <Note
                key={i}
                note={note}
                toggleImportance={() => toggleImportanceOf(note.id)}
                getSpecific={() => noteService.getSpecific(note.id)}
                removeOf={() => removeOf(note.id)}
            />
        ));
    };

    const removeOf = id => {
        const note = notes.find(note => note.id === id);
        noteService
            .remove(note.id)
            .then(() => setNotes(notes.filter(note => note.id !== id)));
    };

    return (
        <div>
            <h1 className="Header">Notes</h1>
            <Notification message={message} />
            <div className="Wrapper">
                {user === null ? (
                    loginForm()
                ) : (
                    <div>
                        <p>{user.name} logged in</p>
                        {noteForm()}
                    </div>
                )}
            </div>
            <div className="Wrapper">
                <div>
                    <button onClick={() => setShowAll(!showAll)}>
                        show {showAll ? "important" : "all"}
                    </button>
                </div>
                <ul>{rows()}</ul>
            </div>
        </div>
    );
};

export default App;
