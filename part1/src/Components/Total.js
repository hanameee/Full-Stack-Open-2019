import React from "react";

function Total({ arr }) {
    console.log(arr);
    const total = arr.reduce((acc, cur) => {
        console.log(`acc: ${acc} cur: ${cur}`);
        return acc + cur;
    }, 0);
    return <p>Number of exercises: {total}</p>;
}

export default Total;
