import { useCallback, useEffect, useState } from "react";
import CoursePlannerClient from "../../common/CoursePlannerClient";
import { useHistory, useParams } from "react-router-dom";

const usePlan = () => {
    const history = useHistory();

    const [student, setStudent] = useState();
    const [programme, setProgramme] = useState({});
    const { planId } = useParams();
    const [courses, setCourses] = useState([]);
    const [plan, setPlan] = useState([]);
    const [lastSaveDate, setLastSaveDate] = useState(new Date());

    const initPage = useCallback(async () => {
        // Promise.all because we are going to have a lot of API calls once requirements/courses/notes come in !
        Promise.all([CoursePlannerClient.getCourses(), CoursePlannerClient.getPlan(planId)])
            .then(([courses, plan]) => {
                setCourses(courses);
                setPlan(plan);
                CoursePlannerClient.getProgramme(plan.programmeDegree).then((res) => setProgramme(res));
                CoursePlannerClient.getStudentById(plan.student).then((res) => setStudent(res));
            })
            .catch((e) => console.log(e));
    }, [planId]);

    useEffect(() => {
        initPage();
    }, [initPage]);

    const updatePlan = (res) => {
        setPlan(res);
        setLastSaveDate(new Date());
    };

    const savePlan = (courseAllocations, name, numYears, startYear, notes) =>
        CoursePlannerClient.updatePlan({ ...plan, courseAllocations, name, numYears, startYear, notes }).then(updatePlan);

    const setCourseAllocations = (courseAllocations) => CoursePlannerClient.updatePlan({ ...plan, courseAllocations }).then(updatePlan);

    const setNotes = (notes) => CoursePlannerClient.updatePlan({ ...plan, notes }).then(updatePlan);

    const setName = (name) => CoursePlannerClient.updatePlan({ ...plan, name }).then(updatePlan);

    const setStartYear = (startYear) => CoursePlannerClient.updatePlan({ ...plan, startYear }).then(updatePlan);

    const setNumYears = (numYears) => CoursePlannerClient.updatePlan({ ...plan, numYears }).then(updatePlan);

    const deletePlan = (student, programme) =>
        CoursePlannerClient.deletePlan(plan._id).then(() =>
            student ? history.push(`/students/${student.upi}`) : history.push(`/programmes/${programme._id}`),
        );

    return {
        student,
        deletePlan,
        courses,
        programme,
        plan,
        setCourseAllocations,
        setName,
        setNumYears,
        setStartYear,
        savePlan,
        lastSaveDate,
        setNotes,
    };
};

export default usePlan;
