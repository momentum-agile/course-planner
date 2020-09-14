import { useEffect, useState, useMemo } from "react";
import CoursePlannerClient from "../../common/CoursePlannerClient";

const courseTableColumns = [
    {
        Header: "Name",
        accessor: "name",
    },
    {
        Header: "UPI",
        accessor: "upi",
    },
    {
        Header: "ID",
        accessor: "id",
    },
];

const useStudents = () => {
    const [students, setStudents] = useState([]);

    const addStudent = (student) => {
        CoursePlannerClient.addStudent(student)
            .then(() => fetchAllStudents())
            .catch((e) => console.error(e));
    };

    const editStudent = (student) => {
        CoursePlannerClient.editStudent(student)
            .then(() => fetchAllStudents())
            .catch((e) => console.error(e));
    };

    const deleteStudent = (upi) => {
        CoursePlannerClient.deleteStudent(upi)
            .then(() => fetchAllStudents())
            .catch((e) => console.error(e));
    };

    const fetchAllStudents = () => {
        CoursePlannerClient.getStudents()
            .then((res) => setStudents(res))
            .catch((e) => console.error(e));
    };

    useEffect(() => fetchAllStudents(), []);

    const columns = useMemo(() => courseTableColumns, []);
    const data = useMemo(() => students, [students]);

    return { data, columns, editStudent, deleteStudent, addStudent };
};

export default useStudents;
