import React, { useState } from "react";
import History from "./Components/ex2/History";
import Button from "./Components/ex2/Button";

function App() {
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);
    const [allClicks, setAll] = useState([]);

    const handleLeftClick = () => {
        setAll(allClicks.concat("L"));
        setLeft(left + 1);
    };

    const handleRightClick = () => {
        setAll(allClicks.concat("R"));
        setRight(right + 1);
    };

    const hello = who => console.log("hello", who);

    return (
        <div className="App">
            <div>
                <div>
                    left: {left}
                    <Button onClick={handleLeftClick} text="left" />
                    <Button onClick={handleRightClick} text="right" />
                    right: {right}
                </div>
                <History allClicks={allClicks} />
                <button onClick={() => hello("world")}>button</button>
                <button onClick={() => hello("react")}>button</button>
                <button onClick={() => hello("function")}>button</button>
            </div>
        </div>
    );
}

export default App;
