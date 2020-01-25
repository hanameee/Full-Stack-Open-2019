import React, { useState, useEffect } from "react";
import Filter from "./Components/part2/ex6-10/Filter";
import PersonForm from "./Components/part2/ex6-10/PersonForm";
import Persons from "./Components/part2/ex6-10/Persons";
import axios from "axios";
import Note from "./Components/Note";

const App = () => {
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        console.log("effect");
        axios.get("http://localhost:3001/notes").then(response => {
            console.log("promise furfilled");
            setNotes(response.data);
        });
    }, []);
    console.log("render", notes.length, "notes");
    console.log(notes);
    const [person, setPerson] = useState([
        { name: "Arto Hellas", number: "040-123456" },
        { name: "Ada Lovelace", number: "39-44-5323523" },
        { name: "Dan Abramov", number: "12-43-234345" },
        { name: "Mary Poppendieck", number: "39-23-6423122" }
    ]);
    const [filter, setFilter] = useState("");
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const handleOnSubmit = event => {
        event.preventDefault();
        const nameObject = {
            name: newName,
            number: newNumber
        };
        if (person.find(person => person.name === newName) === undefined) {
            setPerson(person.concat(nameObject));
            setNewName("");
            setNewNumber("");
        } else {
            alert(`${newName} is already added to phonebook`);
        }
    };
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter person={person} filter={filter} setFilter={setFilter} />
            <h3>Add a new</h3>
            <PersonForm
                newName={newName}
                setNewName={setNewName}
                newNumber={newNumber}
                setNewNumber={setNewNumber}
                handleOnSubmit={handleOnSubmit}
            />
            <h3>Numbers</h3>
            <Persons person={person} />
            <Note notes={notes} />
        </div>
    );
};

export default App;
