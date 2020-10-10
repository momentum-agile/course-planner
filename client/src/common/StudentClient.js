import ApiClient from "./ApiClient";

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

const getStudent = (upi) => {
    return ApiClient(`student/${upi}`);
};

const getStudentByID = (id) => {
    return ApiClient(`student/id/${id}`);
};

const StudentClient = {
    getStudent,
    getStudents,
    editStudent,
    getStudentById: getStudentByID,
    deleteStudent,
    addStudent,
};

export default StudentClient;
