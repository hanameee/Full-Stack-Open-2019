import React, { useState, useEffect } from "react";

function Statistics({ good, neutral, bad }) {
    const [all, setAll] = useState(0);
    const [average, setAverage] = useState(0);
    const [positive, setPositive] = useState(0);

    useEffect(() => {
        setAll(good + neutral + bad);
    }, [good, neutral, bad]);

    useEffect(() => {
        if (all !== 0) {
            setAverage((good - bad) / all);
            setPositive((good / all) * 100);
        }
    }, [all]);
    return (
        <>
            <h1>statistics</h1>
            <table>
                <tr>
                    <th>good</th>
                    <tb>{good}</tb>
                </tr>
                <tr>
                    <th>neutral</th>
                    <tb>{neutral}</tb>
                </tr>
                <tr>
                    <th>bad</th>
                    <tb>{bad}</tb>
                </tr>
                <tr>
                    <th>all</th>
                    <tb>{all}</tb>
                </tr>
                <tr>
                    <th>average</th>
                    <tb>{average}</tb>
                </tr>
                <tr>
                    <th>positive</th>
                    <tb>{positive}</tb>
                </tr>
            </table>
        </>
    );
}

export default Statistics;
