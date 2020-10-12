const express = require("express");
const router = express.Router();
const LOGGER = require("../common/logger");
const uni = require("../uni-service");
const Course = require("../models/course");
const { parseRequirements } = require("../parser");

// Client posts the courses they want and then only those are saved in the database
/**
 * @swagger
 * path:
 *  /uni/programme:
 *    post:
 *      tags: [Uni]
 *      summary: Receives list of courses the client wants and saves them into database
 *      parameters:
 *        - in: query
 *          name: subject
 *          schema:
 *            type: string
 *          required: true
 *          description: subject of the courses
 *        - in: query
 *          name: year
 *          schema:
 *            type: string
 *          required: true
 *          description: year for the courses
 *        - in: body
 *          name: data
 *          schema:
 *            type: array of courses objects
 *          required: true
 *          description: array of course objects
 *      responses:
 *        "204":
 *          description: Added to database successfully
 *        "400":
 *          description: Error message
 *
 */
router.post("/programme", async (req, res) => {
    const subject = req.query.subject;
    const year = req.query.year || 2021;
    const response = await uni.fetchAllCourses(subject, year);

    if (!response) {
        return res.status(500).send()
    }

    if (response && response.error) {
        LOGGER.error(response.error);
        return res.status(400).json(response.error);
    }

    const { data: clientData } = req.body;
    const { data: universityData } = response;

    // Make array of courses the client wants
    const coursesToPopulateFromClient = clientData.reduce((acc, curr) => {
        const { inDatabase, checked, courseCode, overwrite } = curr;

        // If course is not in database and the client ticked then we want to add to db
        if (!inDatabase && checked) {
            acc.push(courseCode);
            return acc;
        }

        // If course is in database, and client ticked the course and they want to overwrite
        if (inDatabase && checked && overwrite) {
            acc.push(courseCode);
            return acc;
        }

        return acc;
    }, []);

    // Go through university data, filter the courses that the client wants and then prepare the course object for the database
    const mappedData = universityData
        .filter((course) => coursesToPopulateFromClient.includes(`${course.subject} ${course.catalogNbr}`))
        .map((course) => {
            const [prerequisites, corequisities, restrictions] = parseRequirements(course.rqrmntDescr || "");
            const updatedCourse = {
                name: course.titleLong,
                courseCode: `${course.subject} ${course.catalogNbr}`,
                points: course.unitsAcadProg,
                description: course.description,
                prerequisites: prerequisites,
                corequisites: corequisities,
                restrictions: restrictions,
            };
            return updatedCourse;
        });

    // Go through each course and make or update
    mappedData.forEach((course) => {
        Course.findOneAndUpdate({ courseCode: course.courseCode }, course, { upsert: true }, (err, updatedCourse) => {
            if (err) {
                LOGGER.error(err);
                res.status(400).json({ msg: err.message });
            }
        });
    });

    LOGGER.info(`POST Request Succeeded for /uni/programme?subject=${subject}`);
    return res.status(204).send();
});

/**
 * @swagger
 * path:
 *  /uni/programme:
 *    get:
 *      tags: [Uni]
 *      summary: Gets courses for a certain programme
 *      parameters:
 *        - in: query
 *          name: subject
 *          schema:
 *            type: string
 *          required: true
 *          description: subject of the courses
 *        - in: query
 *          name: year
 *          schema:
 *            type: string
 *          required: true
 *          description: year for the courses
 *      responses:
 *        "200":
 *          description: Array of course objects
 *        "400":
 *          description: Error message
 *
 */
router.get("/programme", async (req, res) => {
    const subject = req.query.subject;
    const year = req.query.year || 2021;

    const response = await uni.fetchAllCourses(subject, year);

    if (!response) {
        return res.status(500).send()
    }

    if (response && response.error) {
        LOGGER.error(response.error);
        return res.status(400).json(response.error);
    }

    const { data: universityData } = response;

    // Since we are using an async function in map, this will give us a Array of promises
    const promisedMappedData = universityData.map(async (course) => {
        const courseCode = `${course.subject} ${course.catalogNbr}`;
        const inDatabase = await Course.findOne({ courseCode });
        const updatedCourse = {
            courseCode,
            inDatabase: !!inDatabase,
            checked: false,
            overwrite: false,
        };
        return updatedCourse;
    });

    // Wait for all promises to be resolved
    const mappedData = await Promise.all(promisedMappedData);

    LOGGER.info(`GET Request Succeeded for /uni/programme?subject=${subject}`);
    return res.status(200).send(mappedData);
});

// GET courses for a particular course number
/**
 * @swagger
 * path:
 *  /uni/course:
 *    get:
 *      tags: [Uni]
 *      summary: Get a course for course number
 *      parameters:
 *        - in: query
 *          name: subject
 *          schema:
 *            type: string
 *          required: true
 *          description: subject of the courses
 *        - in: query
 *          name: catalogNbr
 *          schema:
 *            type: string
 *          required: true
 *          description: catalog number for the course i.e 750 for SOFTENG 750
 *        - in: query
 *          name: year
 *          schema:
 *            type: string
 *          required: true
 *          description: year for the courses
 *      responses:
 *        "200":
 *          description: Array of course objects defined in https://api.auckland.ac.nz/service/specs/courses/v2
 *        "400":
 *          description: Error message
 *
 */
router.get("/course", async (req, res) => {
    const subject = req.query.subject;
    const catalogNbr = req.query.catalogNbr;
    const year = req.query.year || 2021;


    const response = await uni.fetchParticularCourse(subject, catalogNbr, year);

    if (!response) {
        return res.status(500).send();
    }

    if (response && response.error) {
        LOGGER.error(response.error);
        return res.status(400).json(response.error);
    }

    if (response && response.total === 0) {
        LOGGER.error("COURSE NOT FOUND");
        return res.status(404).json({});
    }

    const { data } = response;

    const course = data[0] || {};

    const [prerequisites, corequisities, restrictions] = parseRequirements(course.rqrmntDescr || "");
    const updatedCourse = {
        name: course.titleLong,
        courseCode: `${course.subject} ${course.catalogNbr}`,
        points: course.unitsAcadProg,
        description: course.description,
        prerequisites: prerequisites,
        corequisites: corequisities,
        restrictions: restrictions,
    };

    console.log(updatedCourse);

    LOGGER.info(`GET Request Suceeded for /uni/course?&subject=${subject}&catalogNbr=${catalogNbr}&year=${year}`);
    return res.status(200).json(updatedCourse);
});

module.exports = router;
