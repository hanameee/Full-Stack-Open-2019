import React, { useState, useEffect } from "react";
import Filter from "./Components/part2/ex15-18/Filter";
import PeopleForm from "./Components/part2/ex15-18/PeopleForm";
import peopleService from "./Services/people";
import People from "./Components/People";

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
        const targetPerson = people.find(person => person.name === newName);

        if (targetPerson === undefined) {
            peopleService
                .create(nameObject)
                .then(returnedData => setPeople(people.concat(returnedData)));
            setNewName("");
            setNewNumber("");
        } else {
            if (
                window.confirm(
                    `${targetPerson.name} is already added to phonebook. Replace the old number with a new one?`
                )
            ) {
                console.log(targetPerson, "targetPerson");
                peopleService
                    .update(targetPerson.id, nameObject)
                    .then(returnedData =>
                        setPeople(
                            people.map(person =>
                                person.id !== returnedData.id
                                    ? person
                                    : returnedData
                            )
                        )
                    );
                setNewName("");
                setNewNumber("");
            }
        }
    };

    return (
        <div>
            <h1>Phonebook</h1>
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
