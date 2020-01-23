import React, { useState, useEffect } from "react";
import Anecdote from "./Anecdote";
function App() {
    const [selected, setSelected] = useState(-1);
    const arr = Array(6).fill(0);
    const [points, setPoints] = useState(arr);
    const [maxVote, setMaxVote] = useState(-1);
    const clickedRandomHandler = () => {
        const randomNum = Math.floor(Math.random() * 6);
        setSelected(randomNum);
    };

    const clickedVoteHandler = () => {
        const newPoints = [...points];
        newPoints[selected] += 1;
        setPoints(newPoints);
    };

    useEffect(() => {
        let newMaxVote = points.reduce((acc, cur) => {
            if (cur > 0 && cur > acc) {
                return cur;
            } else {
                return acc;
            }
        }, -1);
        newMaxVote = points.findIndex((item, index) => {
            return item === newMaxVote;
        });
        setMaxVote(newMaxVote);
    }, [points]);
    if (selected === -1) {
        return (
            <div>
                <button onClick={clickedRandomHandler}>Click me!</button>
                <h1>try pressing the buttons! :)</h1>
            </div>
        );
    }
    return (
        <>
            <h1>Anecdote of the Day</h1>
            <Anecdote index={selected} />: has <b>{points[selected]}</b> votes
            <br />
            <button onClick={clickedRandomHandler}>
                Next anecdote(random)
            </button>
            <button onClick={clickedVoteHandler}>Vote</button>
            <h1>Anecdote with most votes</h1>
            {maxVote == -1 ? (
                "there is no vote yet :("
            ) : (
                <Anecdote index={maxVote} />
            )}
            {/* {points}
            maxVote: {maxVote} */}
        </>
    );
}

export default App;
