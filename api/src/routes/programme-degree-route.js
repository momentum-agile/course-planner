const express = require("express");
const router = express.Router();
const LOGGER = require("../common/logger");
const ProgrammeDegree = require("../models/programme-degree");

// GET All programme degrees
/**
 * @swagger
 * path:
 *  /programmedegree:
 *    get:
 *      tags: [ProgrammeDegree]
 *      summary: Get all programme degrees
 *      responses:
 *        "200":
 *          description: Array of programme degree objects
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/ProgrammeDegree'
 *        "404":
 *           description: No programme degrees found
 *        "400":
 *           description: Error message
 *
 */
router.get("/", async (req, res) => {
    ProgrammeDegree.find({}, (err, programmeDegrees) => {
        if (err) {
            LOGGER.error(err.message);
            res.status(400).json({ msg: err.message });
        } else {
            if (programmeDegrees.length <= 0) {
                LOGGER.info("No programme degrees found");
                res.status(404).json({ msg: "Requested object not found" });
            } else {
                LOGGER.info("GET request succeeded for /programmedegree");
                res.status(200).json(programmeDegrees);
            }
        }
    });
});

// GET Single programme degree
/**
 * @swagger
 * path:
 *  /programmedegree/{id}:
 *    get:
 *      tags: [ProgrammeDegree]
 *      summary: Get a programme degree by id
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of programme degree
 *      responses:
 *        "200":
 *          description: single programme degree
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ProgrammeDegree'
 *        "404":
 *          description: No programme degree for given id
 *        "400":
 *          description: Database error
 *
 */
router.get("/:id", async (req, res) => {
    ProgrammeDegree.findOne({ _id: req.params.id }, (err, result) => {
        if (err) {
            LOGGER.error(err.message);
            res.status(400).json({ msg: err.message });
        } else {
            if (result === null) {
                LOGGER.info(`No programme degree found for /programmedegree/${req.params.id}`);
                res.status(404).json({ msg: "Requested object not found" });
            } else {
                LOGGER.info(`GET Request Succeeded for /programmedegree/${req.params.id}`);
                res.status(200).json(result);
            }
        }
    });
});

// Creates a new programme degree
/**
 * @swagger
 * path:
 *  /programmedegree/:
 *    post:
 *      tags: [ProgrammeDegree]
 *      summary: Creates a programme degree
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProgrammeDegree'
 *      responses:
 *        "201":
 *          description: A programme degree object is created
 *        "400":
 *          description: Database error
 */
router.post("/", async (req, res) => {
    const programmeDegree = new ProgrammeDegree(req.body);
    programmeDegree.save((err, result) => {
        if (err) {
            LOGGER.error(err.message);
            res.status(400).json({ msg: err.message });
        } else {
            LOGGER.info("POST request succeeded for /programmedegree");
            res.status(201).json(result);
        }
    });
});

// Updates a programme degree
/**
 * @swagger
 * path:
 *  /programmedegree/{id}:
 *    put:
 *      tags: [ProgrammeDegree]
 *      summary: Updates a Programme degree
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of programme degree
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ProgrammeDegree'
 *      responses:
 *        "200":
 *          description: A programme degree schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ProgrammeDegree'
 *        "400":
 *          description: Database error
 */
router.put("/:id", async (req, res) => {
    ProgrammeDegree.findByIdAndUpdate(req.params.id, req.body, { upsert: "true" }, (err, result) => {
        if (err) {
            LOGGER.error(err);
            res.status(400).json({ msg: err.message });
        } else {
            //change to send the updated programmedegree, rather than the old programmedegree
            ProgrammeDegree.findById(result._id, (err, updatedProgrammeDegree) => {
                LOGGER.info("PUT Request Suceeded for /Course/");
                res.status(200).json(updatedProgrammeDegree);
            });
        }
    });
});

// deletes a course
/**
 * @swagger
 * path:
 *  /programmedegree/{id}:
 *    delete:
 *      tags: [ProgrammeDegree]
 *      summary: Deletes a programme degree
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: id of programme degree
 *      responses:
 *        "200":
 *          description: A programme degree schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ProgrammeDegree'
 *        "404":
 *          description: No programme degree found
 *        "400":
 *          description: Database error
 */
router.delete("/:id", (req, res) => {
    ProgrammeDegree.findOneAndDelete({ _id: req.params.id }, (err, result) => {
        if (err) {
            LOGGER.error(err);
            res.status(400).json({ msg: err.message });
        } else {
            if (result === null) {
                LOGGER.info("programme degree not found");
                res.status(404).json({ msg: "Requested object not found" });
            } else {
                LOGGER.info(`DELETE Request Succeeded for /programmedegree/${req.params.id}`);
                res.status(200).json(result);
            }
        }
    });
});

module.exports = router;
