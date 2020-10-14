const fetch = require("node-fetch");
const LOGGER = require("./common/logger");
const AbortController = require('abort-controller');

const courseURL = "https://api.auckland.ac.nz/service/courses/v2/courses"
const controller = new AbortController();

const fetchAllCourses = async (subject, year) => {
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    const timeout = setTimeout(
        () => {
            controller.abort();
        },
        5000,
    );

    try {
        const response = await fetch(courseURL + `?size=200&subject=${subject}&year=${year}`, { method: "GET", headers, signal: controller.signal });
        const json = await response.json();
        return json;
    } catch (error) {
        LOGGER.error(error);
    } finally {
        clearTimeout(timeout);
    }
};

const fetchParticularCourse = async (subject, catalogNbr, year) => {
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    const timeout = setTimeout(
        () => {
            controller.abort();
        },
        5000,
    );

    try {
        const response = await fetch(courseURL + `?size=200&subject=${subject}&year=${year}&catalogNbr=${catalogNbr}`, { method: "GET", headers, signal: controller.signal });
        const json = await response.json();
        return json;
    } catch (error) {
        LOGGER.error(error);
    } finally {
        clearTimeout(timeout)
    }
};

module.exports = {
    fetchAllCourses,
    fetchParticularCourse
};