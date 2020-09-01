const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Regulation = require("./regulation");
/**
 * @swagger
 *  components:
 *    $ref: './regulation.js/#components'
 *    schemas:
 *      Course:
 *        type: object
 *        required:
 *          - name
 *          - courseCode
 *          - points
 *          - semester
 *        properties:
 *          name:
 *            type: string
 *            description: name of the course
 *          courseCode:
 *            type: string
 *            description: code for the course
 *          points:
 *            type: integer
 *            description: points that the course gives
 *          semester:
 *            type: string[]
 *            enum: [S1, S2, SS]
 *            description: the semesters that the course can be taken
 *          prerequisites:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Regulation'
 *            description: prerequisites for this course
 *          corequisites:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Regulation'
 *            description: corequisites for this course
 *          restrictions:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Regulation'
 *            description: restrictions for this course
 *          informalEquivalents:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Course'
 *            description: informal equivalents for this course
 *          description:
 *            type: string
 *            description: description for the course
 */
const courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    courseCode: {
        type: String,
        required: true,
        unique: true,
    },
    points: {
        type: Number,
        required: true,
    },
    semester: {
        type: [String],
        enum: ["S1", "S2", "SS"],
        required: true,
    },
    prerequisites: {
        type: [Regulation],
        required: false,
    },
    corequisites: {
        type: [Regulation],
        required: false,
    },
    restrictions: {
        type: [Regulation],
        required: false,
    },
    informalEquivalents: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Course",
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
});

courseSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Course", courseSchema);
