const express = require("express");
const router = express.Router();
const LOGGER = require("../common/logger");
const Course = require("../models/course");

// GET Single Course
/**
 * @swagger
 * path:
 *  /course/{courseCode}:
 *    get:
 *      tags: [Course]
 *      summary: Get a course by course code
 *      parameters:
 *        - in: path
 *          name: courseCode
 *          schema:
 *            type: string
 *          required: true
 *          description: course code of course
 *      responses:
 *        "200":
 *          description: Single course object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Course'
 *        "204":
 *          description: No course found for given course code
 *        "400":
 *          description: Error message
 *
 */
router.get("/:courseCode", async (req, res) => {
    Course.findOne({ courseCode: req.params.courseCode }, (err, course) => {
        if (err) {
            LOGGER.error(err);
            res.status(400).json({ msg: "Database error thrown" });
        } else {
            if (course == null) {
                LOGGER.info("No course found for /course/{id}");
                res.status(204).send();
            } else {
                LOGGER.info("GET Request Suceeded for /course/{id}");
                LOGGER.info(course);
                res.status(200).send({ course });
            }
        }
    });
});
// GET All Courses
/**
 * @swagger
 * path:
 *  /course:
 *    get:
 *      tags: [Course]
 *      summary: Get all courses
 *      responses:
 *        "200":
 *          description: Array of course objects
 *          content:
 *            application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Course'
 *        "204":
 *          description: No courses found
 *        "400":
 *          description: Error message
 *
 */
router.get("/", async (req, res) => {
    Course.find({}, (err, courses) => {
        if (err) {
            LOGGER.error(err);
            res.status(400).json({ msg: "Database error thrown" });
        } else {
            if (courses.length <= 0) {
                LOGGER.info("No courses found");
                res.status(204).send();
            } else {
                LOGGER.info("GET Request Suceeded for /course");
                LOGGER.info(courses);
                res.status(200).send({ courses });
            }
        }
    });
});

// Updates a course information
/**
 * @swagger
 * path:
 *  /course/:
 *    put:
 *      tags: [Course]
 *      summary: Updates a Course
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Course'
 *      responses:
 *        "200":
 *          description: A course schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Course'
 *        "400":
 *          description: Database error
 */
router.put("/", (req, res) => {
    Course.findOneAndUpdate({ courseCode: req.body.courseCode }, req.body, { upsert: "true" }, (err, course) => {
        if (err) {
            LOGGER.error(err);
            res.status(400).json({ msg: "Database error" });
        } else {
            LOGGER.info("PUT Request Suceeded for /Course/");
            res.status(200).json(course);
        }
    });
});

// Creates a new course
/**
 * @swagger
 * path:
 *  /course/:
 *    post:
 *      tags: [Course]
 *      summary: Creates a Course
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Course'
 *      responses:
 *        "201":
 *          description: A course object is created
 *        "400":
 *          description: Database error
 */
router.post("/", (req, res) => {
    const newCourse = new Course(req.body);
    newCourse.save((err, product) => {
        if (err) {
            LOGGER.error(err);
            res.status(400).json({ msg: "Database error" });
        } else {
            LOGGER.info("POST Request Suceeded for /Course/");
            LOGGER.info(product);
            res.status(201).json(product);
        }
    });
});
// deletes a course
/**
 * @swagger
 * path:
 *  /course/{courseCode}:
 *    delete:
 *      tags: [Course]
 *      summary: Deletes a Course
 *      parameters:
 *        - in: path
 *          name: courseCode
 *          schema:
 *            type: string
 *          required: true
 *          description: course code of course
 *      responses:
 *        "200":
 *          description: A course schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Course'
 *        "204":
 *          description: No course found
 *        "400":
 *          description: Database error (internal)
 */
router.delete("/:courseCode", (req, res) => {
    Course.findOneAndDelete({ courseCode: req.params.courseCode }, (err, course) => {
        if (err) {
            LOGGER.error(err);
            res.status(400).json({ msg: "Database error" });
        } else {
            LOGGER.info("DELETE Request Suceeded for /Course/:courseCode");
            res.status(200).send(course);
        }
    });
});
module.exports = router;
