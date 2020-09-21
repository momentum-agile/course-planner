import CourseClient from "./CourseClient";
import StudentClient from "./StudentClient";
import ProgrammesClient from "./ProgrammesClient";
import UniClient from "./UniClient";

const CoursePlannerClient = {
    ...CourseClient,
    ...StudentClient,
    ...ProgrammesClient,
    ...UniClient,
};

export default CoursePlannerClient;
