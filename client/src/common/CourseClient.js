import ApiClient from "./ApiClient";

const endpoint = "course";

const getCourses = () => {
    return ApiClient(endpoint, {
        method: "GET",
    });
};

const createCourse = (course) => {
    return ApiClient(endpoint, {
        method: "POST",
        body: course,
    });
};

const updateCourse = (course) => {
    return ApiClient(endpoint, {
        method: "PUT",
        body: course,
    });
};

const deleteCourse = (courseCode) => {
    return ApiClient(`${endpoint}/${courseCode}`, {
        method: "DELETE",
    });
};

const CourseClient = {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse,
};

export default CourseClient;
