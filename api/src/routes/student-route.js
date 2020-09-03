const express = require("express");
const router = express.Router();
const LOGGER = require("../common/logger");
const Student = require("../models/student");

// GET a single student
/**
 * @swagger
 * path:
 *  /student/{upi}:
 *    get:
 *      tags: [Student]
 *      summary: Get a student by upi
 *      parameters:
 *        - in: path
 *          name: upi
 *          schema:
 *            type: string
 *          required: true
 *          description: upi of student
 *      responses:
 *        "200":
 *          description: Single student object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Student'
 *        "404":
 *          description: No student found for given upi
 *        "400":
 *          description: Error message
 *
 */
router.get("/:upi", async (req, res) => {
    Student.findOne({ upi: req.params.upi }, (err, student) => {
        if (err) {
            LOGGER.error(err);
            res.status(400).json({ msg: err.message });
        } else {
            if (student === null) {
                LOGGER.info(`No student found for /student/${req.params.upi}`);
                res.status(404).json({ msg: "Requested object not found" });
            } else {
                LOGGER.info(`GET Request Succeeded for /student/${req.params.upi}`);
                LOGGER.info(student);
                res.status(200).json(student);
            }
        }
    });
});

// Updates a student information
/**
 * @swagger
 * path:
 *  /student/:
 *    put:
 *      tags: [Student]
 *      summary: Updates a student
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Student'
 *      responses:
 *        "200":
 *          description: A student schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Student'
 *        "400":
 *          description: Database error
 */
router.put("/", async (req, res) => {
    Student.findOneAndUpdate({ upi: req.body.upi }, req.body, { upsert: "true" }, (err, student) => {
        if (err) {
            LOGGER.error(err);
            res.status(400).json({ msg: err.message });
        } else {
            LOGGER.info("PUT Request Succeeded for /student/");
            res.status(200).json(student);
        }
    });
});

// Creates a new student
/**
 * @swagger
 * path:
 *  /student/:
 *    post:
 *      tags: [Student]
 *      summary: Creates a student
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Student'
 *      responses:
 *        "201":
 *          description: A student object is created
 *        "400":
 *          description: Database error
 */
router.post("/", async (req, res) => {
    const newStudent = new Student(req.body);
    newStudent.save((err, product) => {
        if (err) {
            LOGGER.error(err);
            res.status(400).json({ msg: err.message });
        } else {
            LOGGER.info("POST Request Succeeded for /student/");
            LOGGER.info(product);
            res.status(201).json(product);
        }
    });
});
// deletes a student
/**
 * @swagger
 * path:
 *  /student/{upi}:
 *    delete:
 *      tags: [Student]
 *      summary: Deletes a student
 *      parameters:
 *        - in: path
 *          name: upi
 *          schema:
 *            type: string
 *          required: true
 *          description: upi of student
 *      responses:
 *        "200":
 *          description: A student schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Student'
 *        "404":
 *          description: No student found
 *        "400":
 *          description: Database error (internal)
 */
router.delete("/:upi", async (req, res) => {
    Student.findOneAndDelete({ upi: req.params.upi }, (err, student) => {
        if (err) {
            LOGGER.error(err);
            res.status(400).json({ msg: err.message });
        } else {
            if (student === null) {
                res.status(404).json({ msg: "Requested object not found" });
            }
            LOGGER.info(`DELETE Request Succeeded for /student/${req.params.upi}`);
            res.status(200).send(student);
        }
    });
});
module.exports = router;
