import React, { useState, useEffect } from "react";
import Statistics from "./Components/ex6-11/Statistics";
function App() {
    // save clicks of each button to own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const clickGoodHandler = () => {
        setGood(good + 1);
    };
    const clickNeutralHandler = () => {
        setNeutral(neutral + 1);
    };
    const clickBadHandler = () => {
        setBad(bad + 1);
    };

    return (
        <div>
            <h1>Give FeedBack</h1>
            <button onClick={clickGoodHandler}>Good</button>
            <button onClick={clickNeutralHandler}>Neutral</button>
            <button onClick={clickBadHandler}>Bad</button>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
}

export default App;
