import ApiClient from "./ApiClient";

const endpoint = "uni";

const getUniCoursesForDegree = (degree) => {
    return ApiClient(`${endpoint}/programme?subject=${degree}`, {
        method: "GET",
    });
};

const getSpecificCourse = (subject, courseNbr) => {
    return ApiClient(`${endpoint}/course?subject=${subject}&catalogNbr=${courseNbr}`, {
        method: "GET",
    });
};

const createAllUniApiCourses = (subject, data) => {
    return ApiClient(`${endpoint}/programme?subject=${subject}`, {
        method: "POST",
        body: { data },
    });
};

const UniClient = {
    getUniCoursesForDegree,
    getSpecificCourse,
    createAllUniApiCourses,
};

export default UniClient;
