import ApiClient from "./ApiClient";

const getCourses = () => {
    return ApiClient(`course`);
};

const createCourse = (course) => {
    return ApiClient("course", { body: course, method: "POST" });
};

const updateCourse = (course) => {
    return ApiClient("course", { body: course, method: "PUT" });
};

const CourseClient = {
    getCourses,
    createCourse,
    updateCourse,
};

export default CourseClient;
