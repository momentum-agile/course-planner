import ApiClient from "./ApiClient";

const createAllUniApiCourses = (subject) => {
    return ApiClient(`uni/programme?subject=${subject}`, { method: "GET" });
};

const getSpecificCourse = (subject, courseNbr) => {
    return ApiClient(`uni/course?subject=${subject}&catalogNbr=${courseNbr}`);
};

const UniClient = {
    createAllUniApiCourses,
    getSpecificCourse,
};

export default UniClient;
