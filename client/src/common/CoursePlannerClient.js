import CourseClient from "./CourseClient";
import StudentClient from "./StudentClient";
import ProgrammesClient from "./ProgrammesClient";
import UniClient from "./UniClient";
import PlansClient from "./PlansClient";

const CoursePlannerClient = {
    ...CourseClient,
    ...StudentClient,
    ...ProgrammesClient,
    ...UniClient,
    ...PlansClient,
};

export default CoursePlannerClient;
