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

const getStudents = () => {
    return ApiClient(`student`);
};

const editStudent = (student) => {
    return ApiClient(`student`, {
        method: "PUT",
        body: student,
    });
};

const deleteStudent = (upi) => {
    return ApiClient(`student/${upi}`, {
        method: "DELETE",
    });
};

const addStudent = (student) => {
    return ApiClient(`student`, {
        method: "POST",
        body: student,
    });
};

const MomentumClient = {
    getCourses,
    createCourse,
    updateCourse,
    getStudents,
    addStudent,
    editStudent,
    deleteStudent,
};

export default MomentumClient;
