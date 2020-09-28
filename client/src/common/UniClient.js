import ApiClient from "./ApiClient";

const createAllUniApiCourses = (subject, data) => {
    return ApiClient(`uni/programme?subject=${subject}`, { body: { data }, method: "POST" });
};

const getUniCoursesForDegree = (degree) => {
    return ApiClient(`uni/programme?subject=${degree}`);
};

const getSpecificCourse = (subject, courseNbr) => {
    return ApiClient(`uni/course?subject=${subject}&catalogNbr=${courseNbr}`);
};

const UniClient = {
    createAllUniApiCourses,
    getUniCoursesForDegree,
    getSpecificCourse,
};

export default UniClient;
