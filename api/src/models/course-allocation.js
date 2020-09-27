const mongoose = require("mongoose");
/**
 * @swagger
 *  components:
 *    schemas:
 *      CourseAllocation:
 *        type: object
 *        required:
 *          - course
 *          - year
 *          - semester
 *        properties:
 *          course:
 *            type: Course
 *            $ref: '#/components/schemas/Course'
 *            description: course for this allocation
 *          year:
 *            type: integer
 *            description: year this course is assigned to
 *          semester:
 *            type: string
 *            enum: [S1, S2, SS]
 *            description: semester this course is in
 */
const courseAllocationSchema = {
    course: {
        type: String,
        ref: "Course",
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    semester: {
        type: String,
        enum: ["S1", "S2", "SS"],
        required: true,
    },
};

module.exports = courseAllocationSchema;
