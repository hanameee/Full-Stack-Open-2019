import React, { useState, useEffect } from "react";
import Filter from "./Components/part2/ex15-18/Filter";
import PersonForm from "./Components/part2/ex15-18/PersonForm";
import Persons from "./Components/part2/ex15-18/Persons";
import axios from "axios";

const App = () => {
    const [person, setPerson] = useState([]);
    const [filter, setFilter] = useState("");
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3001/persons").then(response => {
            console.log("promise furfilled");
            setPerson(response.data);
        });
    }, []);

    const handleOnSubmit = event => {
        event.preventDefault();
        const nameObject = {
            name: newName,
            number: newNumber
        };
        if (person.find(person => person.name === newName) === undefined) {
            axios
                .post("http://localhost:3001/persons", nameObject)
                .then(response => setPerson(person.concat(response.data)));
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
        </div>
    );
};

export default App;
