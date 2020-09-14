import CourseClient from "./CourseClient";
import StudentClient from "./StudentClient";
import ProgrammesClient from "./ProgrammesClient";

const CoursePlannerClient = {
    ...CourseClient,
    ...StudentClient,
    ...ProgrammesClient,
};

export default CoursePlannerClient;
