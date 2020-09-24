import ApiClient from "./ApiClient";

const createAllUniApiCourses = (subject, overwrite) => {
    return ApiClient(`uni/programme?subject=${subject}&overwrite=${overwrite}`, { method: "GET" });
};

const getSpecificCourse = (subject, courseNbr) => {
    return ApiClient(`uni/course?subject=${subject}&catalogNbr=${courseNbr}`);
};

const UniClient = {
    createAllUniApiCourses,
    getSpecificCourse,
};

export default UniClient;
