const express = require("express");
const router = express.Router();
const LOGGER = require("../common/logger");
const Plan = require("../models/plan");
const Student = require("../models/student");
const ProgrammeDegree = require("../models/programme-degree");

// GET Single Plan
/**
 * @swagger
 * path:
 *  /plan/{id}:
 *    get:
 *      tags: [Plan]
 *      summary: Get a plan by plan code
 *      parameters:
 *        - in: path
 *          id: id
 *          schema:
 *            type: string
 *          required: true
 *          description: plan code of plan
 *      responses:
 *        "200":
 *          description: Single plan object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Plan'
 *        "404":
 *          description: No plan found for given plan code
 *        "400":
 *          description: Error message
 *
 */
router.get("/:id", async (req, res) => {
    Plan.findOne({_id: req.params.id}, (err, plan) => {
        if (err) {
            LOGGER.error(err);
            res.status(400).json({msg: err.message});
        } else {
            if (plan === null) {
                LOGGER.info(`No plan found for /plan/${req.params.id}`);
                res.status(404).json();
            } else {
                LOGGER.info(`GET request succeeded for /plan/${req.params.id}`);
                LOGGER.debug(plan);
                res.status(200).json(plan);
            }
        }
    });
});
// GET All Plans
/**
 * @swagger
 * path:
 *  /plan:
 *    get:
 *      tags: [Plan]
 *      summary: Get all plans
 *      responses:
 *        "200":
 *          description: Array of plan objects
 *          content:
 *            application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Plan'
 *        "404":
 *          description: No plans found
 *        "400":
 *          description: Error message
 *
 */
router.get("/", async (req, res) => {
    Plan.find({}, (err, plans) => {
        if (err) {
            LOGGER.error(err);
            res.status(400).json({msg: err.message});
        } else {
            if (plans.length <= 0) {
                LOGGER.info("No plans found");
                res.status(404).json();
            } else {
                LOGGER.info("GET request succeeded for /plan");
                LOGGER.debug(plans);
                res.status(200).json(plans);
            }
        }
    });
});

// Updates a plan information
/**
 * @swagger
 * path:
 *  /plan/:
 *    put:
 *      tags: [Plan]
 *      summary: Updates a Plan
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Plan'
 *      responses:
 *        "200":
 *          description: A plan schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Plan'
 *        "400":
 *          description: Database error
 */
router.put("/", async (req, res) => {
    Plan.findByIdAndUpdate(req.body._id, req.body, {upsert: "true"}, (err, plan) => {
        if (err) {
            LOGGER.error(err);
            res.status(400).json({msg: err.message});
        } else {
            //change to send the updated plan, rather than the old plan
            Plan.findById(plan._id, (err, updatedPlan) => {
                LOGGER.info("PUT request succeeded for /Plan/");
                res.status(200).json(updatedPlan);
            });
        }
    });
});

// Creates a new student plan
/**
 * @swagger
 * path:
 *  /plan/student/{upi}:
 *    post:
 *      tags: [Plan]
 *      summary: Creates a Plan
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Plan'
 *      responses:
 *        "201":
 *          description: A plan object is created
 *        "400":
 *          description: Database error
 *        "404":
 *          description: No student found
 */
router.post("/student/:upi", async (req, res) => {
    Student.findOne({upi: req.params.upi}, (err, student) => {
        if (err) {
            LOGGER.error(err);
            res.status(400).json({msg: err.message});
        } else {
            if (student === null) {
                LOGGER.info(`No student found for /student/${req.params.upi}`);
                res.status(404).json({msg: "Requested object not found"});
            } else {
                const newPlan = new Plan(req.body);
                newPlan.save((err, plan) => {
                    if (err) {
                        LOGGER.error(err);
                        res.status(400).json({msg: err.message});
                    } else {
                        LOGGER.info("POST request succeeded for /Plan/student");
                        LOGGER.debug(plan);

                        // Create plan array if it doesnt exist
                        const plans = student.plans || []
                        const updatedPlans = plans.concat(plan._id)
                        student.plans = updatedPlans
                        Student.findByIdAndUpdate(student._id, student, {upsert: "true"}, (err, student) => {
                            res.status(201).json(plan);
                        });
                    }
                });
            }
        }
    });
});
// Creates a new programme plan
/**
 * @swagger
 * path:
 *  /plan/programmedegree/{id}:
 *    post:
 *      tags: [Plan]
 *      summary: Creates a Plan
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Plan'
 *      responses:
 *        "201":
 *          description: A plan object is created
 *        "400":
 *          description: Database error
 *        "404":
 *          description: No programme found
 */
router.post("/programmedegree/:id", async (req, res) => {
    ProgrammeDegree.findOne({_id: req.params.id}, (err, programmedegree) => {
        console.log(programmedegree)
        if (err) {
            LOGGER.error(err);
            res.status(400).json({msg: err.message});
        } else {
            if (programmedegree === null) {
                LOGGER.info(`No programmedegree found for /programmedegree/${req.params.id}`);
                res.status(404).json({msg: "Requested object not found"});
            } else {
                const newPlan = new Plan(req.body);
                newPlan.save((err, plan) => {
                    if (err) {
                        LOGGER.error(err);
                        res.status(400).json({msg: err.message});
                    } else {
                        LOGGER.info("POST request succeeded for /Plan/programmedegree");
                        LOGGER.debug(plan);
                        programmedegree.defaultPlan = plan._id
                        ProgrammeDegree.findByIdAndUpdate(programmedegree._id, programmedegree, {upsert: "true"}, (err, programme) => {
                            res.status(201).json(plan);
                        });
                    }
                });
            }
        }
    });
});

// deletes a plan
/**
 * @swagger
 * path:
 *  /plan/{id}:
 *    delete:
 *      tags: [Plan]
 *      summary: Deletes a Plan
 *      parameters:
 *        - in: path
 *          id: id
 *          schema:
 *            type: string
 *          required: true
 *          description: plan code of plan
 *      responses:
 *        "200":
 *          description: A plan schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Plan'
 *        "404":
 *          description: No plan found
 *        "400":
 *          description: Database error (internal)
 */
router.delete("/:id", async (req, res) => {
    Plan.findOneAndDelete({_id: req.params.id}, (err, plan) => {
        if (err) {
            LOGGER.error(err);
            res.status(400).json({msg: err.message});
        } else {
            if (plan === null) {
                LOGGER.error("Plan does not exist");
                res.status(404).json({msg: "Requested object not found"});
            } else {
                LOGGER.info("DELETE request succeeded for /Plan/${req.params.id}");
                res.status(200).json(plan);
            }
        }
    });
});
module.exports = router;
