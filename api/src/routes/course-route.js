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
 *        "404":
 *          description: No course found for given course code
 *        "400":
 *          description: Error message
 *
 */
router.get("/:courseCode", async (req, res) => {
    Course.findOne({ courseCode: req.params.courseCode }, (err, course) => {
        if (err) {
            LOGGER.error(err);
            res.status(400).json({ msg: err.message });
        } else {
            if (course === null) {
                LOGGER.info(`No course found for /course/${req.params.courseCode}`);
                res.status(404).json();
            } else {
                LOGGER.info(`GET Request Succeeded for /course/${req.params.courseCode}`);
                LOGGER.debug(course);
                res.status(200).json(course);
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
 *        "404":
 *          description: No courses found
 *        "400":
 *          description: Error message
 *
 */
router.get("/", async (req, res) => {
    Course.find({}, (err, courses) => {
        if (err) {
            LOGGER.error(err);
            res.status(400).json({ msg: err.message });
        } else {
            if (courses.length <= 0) {
                LOGGER.info("No courses found");
                res.status(404).json();
            } else {
                LOGGER.info("GET Request Succeeded for /course");
                LOGGER.debug(courses);
                res.status(200).json(courses);
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
router.put("/", async (req, res) => {
    Course.findByIdAndUpdate(req.body._id, req.body, { upsert: "true" }, (err, course) => {
        if (err) {
            LOGGER.error(err);
            res.status(400).json({ msg: err.message });
        } else {
            //change to send the updated course, rather than the old course
            Course.findById(course._id, (err, updatedCourse) => {
                LOGGER.info("PUT request succeeded for /Course/");
                res.status(200).json(updatedCourse);
            });
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
router.post("/", async (req, res) => {
    const newCourse = new Course(req.body);
    newCourse.save((err, course) => {
        if (err) {
            LOGGER.error(err);
            res.status(400).json({ msg: err.message });
        } else {
            LOGGER.info("POST Request Succeeded for /Course/");
            LOGGER.debug(course);
            res.status(201).json(course);
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
 *        "404":
 *          description: No course found
 *        "400":
 *          description: Database error (internal)
 */
router.delete("/:courseCode", async (req, res) => {
    Course.findOneAndDelete({ courseCode: req.params.courseCode }, (err, course) => {
        if (err) {
            LOGGER.error(err);
            res.status(400).json({ msg: err.message });
        } else {
            if (course === null) {
                LOGGER.error("Course does not exist");
                res.status(404).json({ msg: "Requested object not found" });
            } else {
                LOGGER.info(`DELETE request succeeded for /Course/${req.params.courseCode}`);
                res.status(200).json(course);
            }
        }
    });
});
module.exports = router;
