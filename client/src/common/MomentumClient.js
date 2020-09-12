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


const getProgrammes = () => {
    return ApiClient(`programmedegree`);
};

const getProgrammeInfo = (id) => {
    return ApiClient(`programmedegree/${id}`);
};

const createProgramme = (newProgramme) => {
    return ApiClient(`programmedegree`, {
        method: "POST",
        body: newProgramme,
    });
};

const deleteProgramme = (id) => {
    return ApiClient(`programmedegree/${id}`, {
        method: "DELETE",
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
    getProgrammes,
    getProgrammeInfo,
    createProgramme,
    deleteProgramme,
};

export default MomentumClient;
