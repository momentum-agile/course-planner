const express = require("express");
const router = express.Router();
const LOGGER = require("../common/logger");
const uni = require("../uni-service");
const Course = require("../models/course");
const { parseRequirements } = require("../parser")

// GET all courses for a subject and add it into the db
/**
 * @swagger
 * path:
 *  /uni/programme:
 *    get:
 *      tags: [Uni]
 *      summary: Get a plan by plan code
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
 *        "204":
 *          description: Added to database successfully
 *        "400":
 *          description: Error message
 *
 */
router.get("/programme", async (req, res) => {
    const subject = req.query.subject;
    const year = req.query.year || 2021;
    const response = await uni.fetchAllCourses(subject, year);

    if (response.error) {
        LOGGER.error(data.error);
        res.status(400).json(data.error);
    }

    const { data } = response;

    const mappedData = data.map(course => {
        const [prerequisites, corequisities, restrictions] = parseRequirements(course.rqrmntDescr || "")
        const updatedCourse = {
            name: course.titleLong,
            courseCode: `${course.subject} ${course.catalogNbr}`,
            points: course.unitsAcadProg,
            description: course.description,
            prerequisites: prerequisites,
            corequisites: corequisities,
            restrictions: restrictions,
        }
        return updatedCourse;
    })

    mappedData.forEach(course => {
        Course.findOneAndUpdate({ courseCode: course.courseCode }, course, { upsert: true }, (err, course) => {
            if (err) {
                LOGGER.error(err);
                res.status(400).json({ msg: err.message });
            }
        });
    });

    LOGGER.info(`GET Request Succeeded for /uni/programme?subject=${subject}`);
    res.status(204).send();
});

// GET courses for a particular course number
/**
 * @swagger
 * path:
 *  /uni/course:
 *    get:
 *      tags: [Uni]
 *      summary: Get a plan by plan code
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
    const data = await uni.fetchParticularCourse(subject, catalogNbr, year);
    if (data.error) {
        LOGGER.error(data.error);
        res.status(400).json(data.error);
    } else {
        LOGGER.info(`GET Request Suceeded for /uni/course?&subject=${subject}&catalogNbr=${catalogNbr}&year=${year}`);
        res.status(200).json(data);
    }
});

module.exports = router;
