import React from "react";

function Part({ partData }) {
    const { name, exercises } = partData;
    return (
        <div>
            <p>
                Part: {name} <br />
                Exercise:{exercises}
            </p>
        </div>
    );
}

export default Part;
