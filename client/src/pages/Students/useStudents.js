import { useEffect, useState, useMemo } from "react";
import MomentumClient from "../../common/MomentumClient";

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
        MomentumClient.addStudent(student)
            .then(() => fetchAllStudents())
            .catch((e) => console.error(e));
    };

    const editStudent = (student) => {
        MomentumClient.editStudent(student)
            .then(() => fetchAllStudents())
            .catch((e) => console.error(e));
    };

    const deleteStudent = (upi) => {
        MomentumClient.deleteStudent(upi)
            .then(() => fetchAllStudents())
            .catch((e) => console.error(e));
    };

    const fetchAllStudents = () => {
        MomentumClient.getStudents()
            .then((res) => setStudents(res))
            .catch((e) => console.error(e));
    };

    useEffect(() => fetchAllStudents(), []);

    const columns = useMemo(() => courseTableColumns, []);
    const data = useMemo(() => students, [students]);

    return { data, columns, editStudent, deleteStudent, addStudent };
};

export default useStudents;
