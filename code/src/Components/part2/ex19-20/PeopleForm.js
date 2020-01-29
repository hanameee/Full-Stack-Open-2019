import React from "react";

function PeopleForm({
    newName,
    setNewName,
    newNumber,
    setNewNumber,
    handleOnSubmit
}) {
    return (
        <form onSubmit={handleOnSubmit}>
            <div>
                name:
                <input
                    value={newName}
                    onChange={event => setNewName(event.target.value)}
                />
                <div>
                    number:{" "}
                    <input
                        value={newNumber}
                        onChange={event => setNewNumber(event.target.value)}
                    />
                </div>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
}

export default PeopleForm;
