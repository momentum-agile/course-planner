import { useEffect, useMemo, useState } from "react";
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
    const [programmes, setProgrammes] = useState([]);
    const [plans, setPlans] = useState([]);

    const addStudent = (student) => {
        CoursePlannerClient.addStudent(student)
            .then(() => fetchAllStudents())
            .catch((e) => console.error(e));
    };

    const createPlanForStudent = (student, programme) => {
        const { defaultPlan, name: programmeName, _id: programmeID } = programme;
        const { name, upi, _id: studentID } = student;
        return defaultPlan
            ? CoursePlannerClient.getPlan(defaultPlan).then((res) =>
                  CoursePlannerClient.createStudentPlan(upi, {
                      name: `${name}'s ${programmeName} plan`,
                      student: studentID,
                      programmeDegree: programmeID,
                      courseAllocations: res.courseAllocations,
                      startYear: new Date().getFullYear() + 1,
                      numYears: res.numYears,
                      completed: false,
                  }),
              )
            : CoursePlannerClient.createStudentPlan(upi, {
                  name: `${name}'s ${programmeName} plan`,
                  student: studentID,
                  programmeDegree: programmeID,
                  startYear: new Date().getFullYear() + 1,
                  numYears: 1,
                  completed: false,
              });
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
    const fetchAllPrograms = () => {
        CoursePlannerClient.getProgrammes()
            .then((res) => setProgrammes(res))
            .catch((e) => console.error(e));
    };
    const fetchAllPlans = () => {
        CoursePlannerClient.getPlans()
            .then((res) => setPlans(res))
            .catch((e) => console.error(e));
    };

    useEffect(() => {
        fetchAllStudents();
        fetchAllPrograms();
        fetchAllPlans();
    }, []);

    const columns = useMemo(() => courseTableColumns, []);
    const data = useMemo(() => students, [students]);

    return { data, columns, programmes, plans, editStudent, deleteStudent, addStudent, createPlanForStudent };
};

export default useStudents;
