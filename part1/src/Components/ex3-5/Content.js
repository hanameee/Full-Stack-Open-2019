import React from "react";
import Part from "./Part";

function Content({ course }) {
    return (
        <>
            {course.parts.map(part => (
                <Part partData={part} />
            ))}
        </>
    );
}

export default Content;
