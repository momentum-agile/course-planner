import ApiClient from "./ApiClient";

const getStudents = () => {
    return ApiClient(`student`, {
        method: "GET",
    });
};

const getStudent = (upi) => {
    return ApiClient(`student/${upi}`, {
        method: "GET",
    });
};

const getStudentById = (id) => {
    return ApiClient(`student/id/${id}`, {
        method: "GET",
    });
};

const addStudent = (student) => {
    return ApiClient(`student`, {
        method: "POST",
        body: student,
    });
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

const StudentClient = {
    getStudents,
    getStudent,
    getStudentById,
    addStudent,
    editStudent,
    deleteStudent,
};

export default StudentClient;
