const express = require("express");
const router = express.Router();
const LOGGER = require("../common/logger");
const Plan = require("../models/plan");

// GET Single Plan
/**
 * @swagger
 * path:
 *  /plan/{name}:
 *    get:
 *      tags: [Plan]
 *      summary: Get a plan by plan code
 *      parameters:
 *        - in: path
 *          name: name
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
router.get("/:name", async (req, res) => {
    Plan.findOne({ name: req.params.name }, (err, plan) => {
        if (err) {
            LOGGER.error(err);
            res.status(400).json({ msg: err.message });
        } else {
            if (plan === null) {
                LOGGER.info(`No plan found for /plan/${req.params.name}`);
                res.status(404).json();
            } else {
                LOGGER.info(`GET request succeeded for /plan/${req.params.name}`);
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
            res.status(400).json({ msg: err.message });
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
    Plan.findByIdAndUpdate(req.body._id, req.body, { upsert: "true" }, (err, plan) => {
        if (err) {
            LOGGER.error(err);
            res.status(400).json({ msg: err.message });
        } else {
            //change to send the updated plan, rather than the old plan
            Plan.findById(plan._id, (err, updatedPlan) => {
                LOGGER.info("PUT request succeeded for /Plan/");
                res.status(200).json(updatedPlan);
            });
        }
    });
});

// Creates a new plan
/**
 * @swagger
 * path:
 *  /plan/:
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
 */
router.post("/", async (req, res) => {
    const newPlan = new Plan(req.body);
    newPlan.save((err, plan) => {
        if (err) {
            LOGGER.error(err);
            res.status(400).json({ msg: err.message });
        } else {
            LOGGER.info("POST request succeeded for /Plan/");
            LOGGER.debug(plan);
            res.status(201).json(plan);
        }
    });
});

// deletes a plan
/**
 * @swagger
 * path:
 *  /plan/{name}:
 *    delete:
 *      tags: [Plan]
 *      summary: Deletes a Plan
 *      parameters:
 *        - in: path
 *          name: name
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
router.delete("/:name", async (req, res) => {
    Plan.findOneAndDelete({ name: req.params.name }, (err, plan) => {
        if (err) {
            LOGGER.error(err);
            res.status(400).json({ msg: err.message });
        } else {
            if (plan === null) {
                LOGGER.error("Plan does not exist");
                res.status(404).json({ msg: "Requested object not found" });
            } else {
                LOGGER.info("DELETE request succeeded for /Plan/${req.params.name}");
                res.status(200).json(plan);
            }
        }
    });
});
module.exports = router;
