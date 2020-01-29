import React, { useState, useEffect } from "react";
import Filter from "./Components/part2/ex15-18/Filter";
import PeopleForm from "./Components/part2/ex15-18/PeopleForm";
import People from "./Components/part2/ex15-18/People";
import peopleService from "./Services/people";
const App = () => {
    const [people, setPeople] = useState([]);
    const [filter, setFilter] = useState("");
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    useEffect(() => {
        peopleService.getAll().then(returnedData => setPeople(returnedData));
    }, []);

    const handleOnSubmit = event => {
        event.preventDefault();
        const nameObject = {
            name: newName,
            number: newNumber
        };
        if (people.find(person => person.name === newName) === undefined) {
            peopleService
                .create(nameObject)
                .then(returnedData => setPeople(people.concat(returnedData)));
            setNewName("");
            setNewNumber("");
        } else {
            alert(`${newName} is already added to phonebook`);
        }
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter people={people} filter={filter} setFilter={setFilter} />
            <h3>Add a new</h3>
            <PeopleForm
                newName={newName}
                setNewName={setNewName}
                newNumber={newNumber}
                setNewNumber={setNewNumber}
                handleOnSubmit={handleOnSubmit}
            />
            <h3>Numbers</h3>
            <People people={people} setPeople={setPeople} />
        </div>
    );
};

export default App;
