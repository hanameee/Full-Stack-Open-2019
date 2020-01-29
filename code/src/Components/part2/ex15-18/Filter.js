import React from "react";

const Filter = ({ people, filter, setFilter }) => {
    const pl = people.map(person => person.name.toLowerCase());
    const filteredPeople = pl.filter(name =>
        name.includes(filter.toLowerCase())
    );
    const filteredResult =
        filteredPeople.length !== 0 ? (
            filteredPeople.map((item, i) => <p key={i}>{item}</p>)
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
