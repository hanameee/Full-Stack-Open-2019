import React from "react";
import Course from "./Course";

function CourseList({ courses }) {
    const courseList = courses.map(course => <Course course={course} />);
    return courseList;
}

export default CourseList;
