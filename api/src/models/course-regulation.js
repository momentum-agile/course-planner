const mongoose = require("mongoose");
/**
 * @swagger
 *  components:
 *    schemas:
 *      CourseRegulation:
 *        type: object
 *        required:
 *          - type
 *          - courses
 *        properties:
 *          points:
 *            type: integer
 *            description: number of points for this regulation
 *          type:
 *            type: string
 *            enum: [POINTS, TEXT]
 *            description: the type of regulation it is
 *          courses:
 *            type: array
 *            items:
 *              type: string
 *            description: courses needed for this regulation in course code format
 */
const courseRegulationSchema = {
    type: {
        type: String,
        enum: ["POINTS", "TEXT"],
        required: true,
    },
    points: {
        type: Number,
        required: false,
    },
    courses: {
        type: [String],
        required: true,
    },
};

module.exports = courseRegulationSchema;
