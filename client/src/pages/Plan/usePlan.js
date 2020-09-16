import { useEffect, useState, useCallback } from "react";
import CoursePlannerClient from "../../common/CoursePlannerClient";
import { useParams } from "react-router-dom";

const usePlan = () => {
    const [student, setStudent] = useState();
    const { studentId } = useParams();
    const [realCourses, setRealCourses] = useState([]);

    const initPage = useCallback(async () => {
        // Promise.all because we are going to have a lot of API calls
        // once requirements/cousres/notes come in !

        Promise.all([CoursePlannerClient.getStudent(studentId), CoursePlannerClient.getCourses()])
            .then((values) => {
                const [studentRes, realCourses] = values;
                setStudent(studentRes);
                setRealCourses(realCourses);
            })
            .catch((e) => console.log(e));
    }, [studentId]);

    useEffect(() => {
        initPage();
    }, [initPage]);

    return { student, realCourses };
};

export default usePlan;
