import { useEffect, useState, useMemo } from "react";
import MomentumClient from "../../common/MomentumClient";

const courseTableColumns = [
    {
        Header: "Course Code",
        accessor: "courseCode",
    },
    {
        Header: "Course Name",
        accessor: "name",
    },
    {
        Header: "Semester",
        accessor: "semester",
    },
    {
        Header: "Points",
        accessor: "points",
    },
];

const useCourses = () => {
    const [courses, setCourses] = useState([]);

    const fetchAllCourses = () => {
        MomentumClient.getCourses().then(res => setCourses(res))
            .catch(e => console.log(e));
    }

    const updateCourse = (course) => {
        MomentumClient.updateCourse(course).then(r => fetchAllCourses())
            .catch(e => console.log(e));
    }

    useEffect(() => fetchAllCourses(), []);

    const columns = useMemo(() => courseTableColumns, []);
    const data = useMemo(() => courses, [courses]);

    return { data, columns, updateCourse };
};

export default useCourses;
