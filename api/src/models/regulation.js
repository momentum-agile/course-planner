const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
/**
 * @swagger
 *  components:
 *    $ref: './course.js/#components'
 *    schemas:
 *      Regulation:
 *        type: object
 *        required:
 *          - points
 *          - pointRequirement
 *        properties:
 *          points:
 *            type: integer
 *            description: number of points for this regulation
 *          pointRequirement:
 *            type: string
 *            enum: [UPTO, EXACTLY, ATLEAST]
 *            description: the threshold for the amount of points needed
 *          courses:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Course'
 *            description: courses available for this regulation
 */
const regulationSchema = mongoose.Schema({
    points: {
        type: Number,
        required: true,
    },
    pointRequirement: {
        type: String,
        enum: ["UPTO", "EXACT", "ATLEAST"],
        required: true,
    },
    courses: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Course",
        required: false,
    },
});

regulationSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Regulation", regulationSchema);
