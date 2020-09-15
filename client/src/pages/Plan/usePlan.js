import { useEffect, useState, useCallback } from "react";
import CoursePlannerClient from "../../common/CoursePlannerClient";
import { useParams } from "react-router-dom";

const usePlan = () => {
    const [student, setStudent] = useState();
    const { studentId } = useParams();

    const initPage = useCallback(async () => {
        // Promise.all because we are going to have a lot of API calls
        // once requirements/cousres/notes come in !

        Promise.all([CoursePlannerClient.getStudent(studentId)])
            .then((values) => {
                const [studentRes] = values;
                setStudent(studentRes);
            })
            .catch((e) => console.log(e));
    }, [studentId]);

    useEffect(() => {
        initPage();
    }, [initPage]);

    return { student };
};

export default usePlan;
