import React from "react";
import peopleService from "../../../Services/people";

function People({ people, setPeople }) {
    const deleteOnClickHandler = person => {
        if (window.confirm(`Delete ${person.name}?`)) {
            peopleService
                .remove(person.id)
                .then(response =>
                    setPeople(people.filter(p => p.id !== person.id))
                );
        }
    };
    const peopleList = people.map(person => (
        <>
            <p key={person.name}>
                <b>name : </b>
                {person.name} <b>number : </b>
                {person.number ? person.number : ""}{" "}
                <button onClick={() => deleteOnClickHandler(person)}>
                    delete
                </button>
            </p>
        </>
    ));
    return peopleList;
}

export default People;
