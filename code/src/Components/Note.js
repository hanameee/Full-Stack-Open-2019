import React from "react";

const Note = ({ notes }) => {
    const note = notes.map(note => <li key={note.id}>{note.content}</li>);
    return note;
};

export default Note;
