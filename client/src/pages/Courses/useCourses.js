import { useEffect, useMemo, useState } from "react";
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
        accessor: (d) => d.semester.join(", "),
    },
    {
        Header: "Points",
        accessor: "points",
    },
];

const useCourses = () => {
    const [courses, setCourses] = useState([]);

    const createCourse = (course) => CoursePlannerClient.createCourse(course).catch((e) => console.error(e));

    const fetchAllCourses = () =>
        CoursePlannerClient.getCourses()
            .then((res) => setCourses(res))
            .catch((e) => console.log(e));

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

    const createCoursesFromUniApi = (subject, data, toast) => {
        CoursePlannerClient.createAllUniApiCourses(subject, data)
            .then(() => fetchAllCourses())
            .then(() => {
                toast({
                    title: "Courses Added",
                    description: `Courses successfully imported from the University Courses API`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            })
            .catch((e) => {
                toast({
                    isClosable: true,
                    duration: 9000,
                    title: `Error: ${e}`,
                    description: `Error happened when trying to import courses from the University Courses API`,
                    status: "error",
                });
            });
    };

    // Calling uni API to get course information
    const prefillCourse = (subject, courseNumber) => {
        return CoursePlannerClient.getSpecificCourse(subject, courseNumber);
    };

    useEffect(() => {
        fetchAllCourses();
    }, []);

    const columns = useMemo(() => courseTableColumns, []);
    const data = useMemo(() => courses, [courses]);

    return {
        createCourse,
        data,
        columns,
        fetchAllCourses,
        updateCourse,
        deleteCourse,
        createCoursesFromUniApi,
        prefillCourse,
    };
};

export default useCourses;
