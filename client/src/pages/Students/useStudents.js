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

    const createStudent = (student) =>
        CoursePlannerClient.addStudent(student)
            .then(() => fetchAllStudents())
            .catch((e) => console.error(e));

    const createPlanForStudent = (student, planName, programme) => {
        const { defaultPlan, _id: programmeID } = programme;
        const { upi, _id: studentID } = student;
        return defaultPlan
            ? CoursePlannerClient.getPlan(defaultPlan).then((res) =>
                  CoursePlannerClient.createStudentPlan(upi, {
                      name: planName,
                      student: studentID,
                      programmeDegree: programmeID,
                      courseAllocations: res.courseAllocations,
                      startYear: new Date().getFullYear() + 1,
                      numYears: res.numYears,
                      completed: false,
                  }),
              )
            : CoursePlannerClient.createStudentPlan(upi, {
                  name: planName,
                  student: studentID,
                  programmeDegree: programmeID,
                  startYear: new Date().getFullYear() + 1,
                  numYears: 1,
                  completed: false,
              });
    };

    const updateStudent = (student) => {
        CoursePlannerClient.editStudent(student)
            .then(() => fetchAllStudents())
            .catch((e) => console.error(e));
    };

    const deleteStudent = (upi) => {
        return CoursePlannerClient.deleteStudent(upi)
            .then(() => fetchAllStudents())
            .catch((e) => console.error(e));
    };

    const fetchAllStudents = () => {
        CoursePlannerClient.getStudents()
            .then((res) => setStudents(res))
            .catch((e) => (e.msg === "Requested objects not found" ? setStudents([]) : console.error(e.msg)));
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

    return { data, columns, programmes, plans, updateStudent, deleteStudent, createStudent, createPlanForStudent };
};

export default useStudents;
