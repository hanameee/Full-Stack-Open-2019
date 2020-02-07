import React from "react";

const Note = ({ note, toggleImportance, getSpecific, removeOf }) => {
    const label = note.important ? "make not important" : "make important";
    return (
        <li>
            {note.content}
            <button onClick={toggleImportance}>{label}</button>
            <button onClick={removeOf}>remove</button>
        </li>
    );
};

export default Note;
