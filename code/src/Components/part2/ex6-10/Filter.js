import React from "react";

const Filter = ({ person, filter, setFilter }) => {
    const pl = person.map(person => person.name.toLowerCase());
    const filteredPerson = pl.filter(name =>
        name.includes(filter.toLowerCase())
    );
    const filteredResult =
        filteredPerson.length !== 0 ? (
            filteredPerson.map((item, i) => <p key={i}>{item}</p>)
        ) : (
            <p>
                <b>no result found</b>
            </p>
        );
    return (
        <div>
            filter shown with:
            <input
                value={filter}
                onChange={event => setFilter(event.target.value)}
            />
            {filter ? (
                filteredResult
            ) : (
                <p>
                    <b>please enter filter!</b>
                </p>
            )}
        </div>
    );
};

export default Filter;
