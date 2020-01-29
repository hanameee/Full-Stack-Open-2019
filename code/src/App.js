import React, { useState, useEffect } from "react";
import Filter from "./Components/part2/ex19-20/Filter";
import PeopleForm from "./Components/part2/ex19-20/PeopleForm";
import People from "./Components/part2/ex19-20/People";
import peopleService from "./Services/people";
import Notification from "./Components/Notification";

const App = () => {
    const [people, setPeople] = useState([]);
    const [filter, setFilter] = useState("");
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const initialMessage = {
        content: "",
        type: null
    };
    const [message, setMessage] = useState(initialMessage);

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
            peopleService.create(nameObject).then(returnedData => {
                setPeople(people.concat(returnedData));
                setMessage({
                    content: `Added ${returnedData.name}`,
                    type: "notice"
                });
                setTimeout(() => setMessage(initialMessage), 3000);
            });
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
                    .then(returnedData => {
                        setPeople(
                            people.map(person =>
                                person.id !== returnedData.id
                                    ? person
                                    : returnedData
                            )
                        );
                        setMessage({
                            content: `Updated ${returnedData.name}`,
                            type: "notice"
                        });
                        setTimeout(() => setMessage(initialMessage), 3000);
                    })
                    .catch(error => {
                        setPeople(
                            people.filter(
                                person => person.id !== targetPerson.id
                            )
                        );
                        setMessage({
                            content: `Information of ${targetPerson.name} has already been deleted from the server`,
                            type: "warning"
                        });
                        setTimeout(() => setMessage(initialMessage), 3000);
                    });
            }
        }
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} />
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
