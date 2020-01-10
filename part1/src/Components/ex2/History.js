import React from "react";

function History({ allClicks }) {
    if (allClicks.length === 0) {
        return <div>try pressing the buttons! :)</div>;
    }
    return <div>button press history : {allClicks.join(" ")}</div>;
}

export default History;
