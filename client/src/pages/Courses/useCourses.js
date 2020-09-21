import { useEffect, useState, useMemo } from "react";
import CoursePlannerClient from "../../common/CoursePlannerClient";

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

    const createCourse = (course) => {
        CoursePlannerClient.createCourse(course)
            .then(() => fetchAllCourses())
            .catch((e) => console.error(e));
    };

    const fetchAllCourses = () => {
        CoursePlannerClient.getCourses()
            .then((res) => setCourses(res))
            .catch((e) => console.log(e));
    };

    const updateCourse = (course) => {
        CoursePlannerClient.updateCourse(course)
            .then((r) => fetchAllCourses())
            .catch((e) => console.log(e));
    };

    const deleteCourse = (courseCode) => {
        CoursePlannerClient.deleteCourse(courseCode)
            .then((r) => fetchAllCourses())
            .catch((e) => console.log(e));
    };

    const createAllCoursesFromUniAPI = (subject) => {
        CoursePlannerClient.createAllUniApiCourses(subject)
            .then(() => fetchAllCourses())
            .catch((e) => console.log(e));
    };

    useEffect(() => fetchAllCourses(), []);

    const columns = useMemo(() => courseTableColumns, []);
    const data = useMemo(() => courses, [courses]);

    return { createCourse, data, columns, updateCourse, deleteCourse, createAllCoursesFromUniAPI };
};

export default useCourses;
