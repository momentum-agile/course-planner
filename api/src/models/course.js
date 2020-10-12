const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const CourseRegulaton = require("./course-regulation");
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
 *              type: string
 *            description: prerequisites for this course
 *          corequisites:
 *            type: array
 *            items:
 *              type: string
 *            description: corequisites for this course
 *          restrictions:
 *            type: array
 *            items:
 *              type: string
 *            description: restrictions for this course noted by course codes
 *          informalEquivalents:
 *            type: array
 *            items:
 *              type: string
 *            description: informal equivalents for this course noted by course codes
 *          description:
 *            type: string
 *            description: description for the course
 *          isPlaceholder:
 *            type: boolean
 *            description: determines if the course is a real course or placeholder
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
        required: false,
    },
    prerequisites: {
        type: [String],
        required: false,
    },
    corequisites: {
        type: [String],
        required: false,
    },
    restrictions: {
        type: [String],
        required: false,
    },
    informalEquivalents: {
        type: [String],
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    isPlaceholder: {
        type: Boolean,
        required: false,
    },
});

courseSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Course", courseSchema);
