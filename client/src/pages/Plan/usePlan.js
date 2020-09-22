import { useEffect, useState, useCallback } from "react";
import CoursePlannerClient from "../../common/CoursePlannerClient";
import { useParams } from "react-router-dom";

const dummyProg = {
    regulations: [
        {
            courses: ["SOFTENG370", "SOFTENG370", "SOFTENG370"],
            _id: "5f62d3e1ee8b1a00279706fe",
            points: 40,
            pointRequirement: "EXACTLY",
            isSatisfied: true,
        },
        {
            courses: ["SOFTENG370", "SOFTENG370"],
            _id: "5f62d578c127820027cd731d",
            points: 0,
            pointRequirement: "ATLEAST",
            isSatisfied: false,
        },
        {
            courses: ["SOFTENG370"],
            _id: "5f62d585c127820027cd7320",
            points: 15,
            pointRequirement: "EXACTLY",
            isSatisfied: false,
        },
        {
            courses: ["SOFTENG370", "SOFTENG370"],
            _id: "5f62d585c127820027cd7320",
            points: 30,
            pointRequirement: "ATLEAST",
            isSatisfied: true,
        },
        {
            courses: ["SOFTENG370"],
            _id: "5f62d585c127820027cd7320",
            points: 15,
            pointRequirement: "EXACTLY",
            isSatisfied: false,
        },
        {
            courses: ["SOFTENG370", "SOFTENG370", "SOFTENG370"],
            _id: "5f62d3e1ee8b1a00279706fe",
            points: 40,
            pointRequirement: "UPTO",
            isSatisfied: false,
        },
    ],
};

const usePlan = () => {
    const [student, setStudent] = useState();
    const [programme, setProgramme] = useState(dummyProg);
    const { studentId } = useParams();
    const [realCourses, setRealCourses] = useState([]);

    const initPage = useCallback(async () => {
        // Promise.all because we are going to have a lot of API calls
        // once requirements/cousres/notes come in !

        // TODO: Add API call to get the specific ProgrammeDegree (programme) for the plan
        Promise.all([CoursePlannerClient.getStudent(studentId), CoursePlannerClient.getCourses()])
            .then((values) => {
                const [studentRes, realCourses] = values;
                setStudent(studentRes);
                setRealCourses(realCourses);
                setProgramme(dummyProg);
            })
            .catch((e) => console.log(e));
    }, [studentId]);

    useEffect(() => {
        initPage();
    }, [initPage]);

    return { student, realCourses, programme };
};

export default usePlan;
