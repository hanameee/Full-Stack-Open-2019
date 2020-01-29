import React from "react";

function Persons({ person }) {
    const personList = person.map(person => (
        <p key={person.name}>
            name : {person.name}
            <br />
            {person.number ? `number : ${person.number}` : ""}
        </p>
    ));
    return personList;
}

export default Persons;
