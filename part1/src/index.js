import React from "react";
import ReactDOM from "react-dom";
import Content from "./Components/Content";
import Header from "./Components/Header";
import Total from "./Components/Total";

const App = () => {
    const course = "Half Stack application development";
    const part1 = "Fundamentals of React";
    const exercises1 = 10;
    const part2 = "Using props to pass data";
    const exercises2 = 7;
    const part3 = "State of a component";
    const exercises3 = 14;
    const contentData = [
        [part1, exercises1],
        [part2, exercises2],
        [part3, exercises3]
    ];

    return (
        <div>
            <Header course={course} />
            <Content contentData={contentData} />
            <Total arr={[exercises1, exercises2, exercises3]} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
