import React, { useState } from "react";
import { Button } from "../../components";
import { MomentumClient } from "../../common";

const HomePage = () => {
    const [courses, setCourses] = useState([]);

    const apiCall = () => {
        MomentumClient.getCourses().then((res) => {
            const { courses } = res;
            setCourses(courses);
        });
    };

    return (
        <div>
            <Button onClick={apiCall} />
            <p> This is the home page</p>
            <li>{courses.length > 0 && courses.map(({ courseName }, id) => <ul key={id}> {courseName} </ul>)}</li>
        </div>
    );
};

export default HomePage;
