import ApiClient from "./ApiClient";

const createAllUniApiCourses = (subject) => {
    return ApiClient(`uni/programme?subject=${subject}`, { method: "GET" });
};

const getSpecificCourse = (subject, courseNbr) => {
    return ApiClient(`uni/programme?subject=${subject}&courseNbr=${courseNbr}`);
};

const UniClient = {
    createAllUniApiCourses,
    getSpecificCourse,
};

export default UniClient;
