import React, { useState, useEffect } from "react";

import "./App.css";
import Note from "./Components/Note";
import noteService from "./Services/notes";
import loginService from "./Services/login";
import Notification from "./Components/Notification";
import LoginForm from "./Components/LoginForm";
import NoteForm from "./Components/NoteForm";
import Togglable from "./Components/Togglable";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [showAll, setShowAll] = useState(true);
    const initialMessage = {
        content: "",
        type: null
    };
    const [message, setMessage] = useState(initialMessage);

    const [user, setUser] = useState(null);

    const noteForm = () => {
        return (
            <Togglable buttonLabel="create new note">
                <NoteForm createNote={createNote} />
            </Togglable>
        );
    };

    const loginForm = () => {
        return (
            <Togglable buttonLabel="login">
                <LoginForm handleLogin={handleLogin} />
            </Togglable>
        );
    };

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

    const createNote = noteObject => {
        noteService.create(noteObject).then(returnedNote => {
            setNotes(notes.concat(returnedNote));
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

    const handleLogin = async ({ username, password }) => {
        try {
            const User = await loginService.login({ username, password });
            window.localStorage.setItem(
                "loggedNoteappUser",
                JSON.stringify(User)
            );
            noteService.setToken(User.token);
            setUser(User);
        } catch (exception) {
            setMessage({
                content: "Wrong credentials",
                type: "warning"
            });
            setTimeout(() => {
                setMessage(initialMessage);
            }, 3000);
        }
    };

    const handleLogout = () => {
        window.localStorage.removeItem("loggedNoteappUser");
        setMessage({
            content: "Logged out successfully :) will be redirected in 3sec.",
            type: "notice"
        });
        setTimeout(() => {
            setMessage(initialMessage);
            window.location.reload(true);
        }, 3000);
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
                        <button onClick={handleLogout}>logout</button>
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
