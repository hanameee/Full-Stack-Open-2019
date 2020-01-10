import React from "react";

function Total({ course }) {
    const total = course.parts.reduce((acc, cur) => {
        cur = cur.exercises;
        return acc + cur;
    }, 0);
    return <p>Number of exercises: {total}</p>;
}

export default Total;
