import ApiClient from "./ApiClient";

const getCourses = () => {
    return ApiClient(`course`);
};

const createCourse = (course) => {
    return ApiClient('course', { body: course, method: "POST" });
}

const updateCourse = (course) => {
    return ApiClient('course', { body: course, method: "PUT" })
}

const MomentumClient = {
    getCourses,
    createCourse,
    updateCourse
};

export default MomentumClient;
