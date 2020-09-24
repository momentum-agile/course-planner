const mongoose = require("mongoose");
const CourseAllocation = require("./course-allocation");

/**
 * @swagger
 *  components:
 *    schemas:
 *      Student:
 *        $ref: './student.js/#components'
 *      ProgrammeDegree:
 *        $ref: './programme-degree.js/#components'
 *      Plan:
 *        type: object
 *        required:
 *          - name
 *          - student
 *          - programmeDegree
 *          - completed
 *          - startYear
 *          - endYear
 *        properties:
 *          name:
 *            type: string
 *            description: name of the plan
 *          student:
 *            type: Student
 *            $ref: '#/components/schemas/Student'
 *          courseAllocation:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/CourseAllocation'
 *            description: mapping of courses and the year they are assigned to
 *          programmeDegree:
 *            type: plan
 *            $ref: '#/components/schemas/ProgrammeDegree'
 *            description: programme degree for this associated plan
 *          startYear:
 *            type: integer
 *            description: start year of the plan
 *          endYear:
 *            type: integer
 *            description: end year of the plan
 *          completed:
 *            type: boolean
 *            description: if this plan has been completed
 */
const planSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: false,
    },
    courseAllocations: {
        type: [CourseAllocation],
        required: false,
    },
    programmeDegree: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProgrammeDegree",
        required: true,
    },
    startYear: {
        type: Number,
        required: true,
    },
    numYears: {
        type: Number,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
    },
});

module.exports = mongoose.model("Plan", planSchema);
