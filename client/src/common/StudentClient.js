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

const StudentClient = {
    getStudents,
    editStudent,
    deleteStudent,
    addStudent,
};

export default StudentClient;
