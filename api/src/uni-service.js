const fetch = require("node-fetch");
const LOGGER = require("./common/logger");

const courseURL = "https://api.auckland.ac.nz/service/courses/v2/courses"


const fetchAllCourses = async (subject, year) => {
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    try {
        const response = await fetch(courseURL + `?size=200&subject=${subject}&year=${year}`, { method: "GET", headers });
        const json = await response.json();
        return json;
    } catch (error) {
        LOGGER.error(error);
    }
};

const fetchParticularCourse = async (subject, catalogNbr, year) => {
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    try {
        const response = await fetch(courseURL + `?size=200&subject=${subject}&year=${year}&catalogNbr=${catalogNbr}`, { method: "GET", headers });
        const json = await response.json();
        return json;
    } catch (error) {
        LOGGER.error(error);
    }
};

module.exports = {
    fetchAllCourses,
    fetchParticularCourse
};