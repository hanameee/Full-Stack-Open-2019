import React from "react";

function Part({ partData }) {
    const [part, exercise] = partData;
    return (
        <div>
            <p>
                Part: {part} <br />
                Exercise:{exercise}
            </p>
        </div>
    );
}

export default Part;
