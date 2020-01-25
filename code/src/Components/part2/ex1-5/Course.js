function Course({ course }) {
    const parts = course.parts.map(part => (
        <p key={part.id}>
            {part.name} {part.exercises}
        </p>
    ));
    const sum = course.parts.reduce((acc, cur) => acc + cur.exercises, 0);

    return (
        <div>
            <header>
                <h1>{course.name}</h1>
            </header>
            <div className="content">{parts}</div>
            <div className="sum">
                <b>total of {sum} exercises</b>
            </div>
        </div>
    );
}

export default Course;
