const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
/**
 * @swagger
 *  components:
 *   schemas:
 *    Student:
 *      type: object
 *      required:
 *        - name
 *        - upi
 *        - id
 *      properties:
 *        name:
 *          type: string
 *          description: name of the student
 *        id:
 *          type: string
 *          description: ID of the student
 *        upi:
 *          type: string
 *          description: Students UPI
 *        yearLevel:
 *          type: integer
 *          description: year level of the student
 *        plans:
 *          type: array
 *          items:
 *            type: plan
 *            default: null
 *          description: the plans that the student has
 */
const studentSchema = mongoose.Schema({
    name: {
        type: String,
        unique: false,
        required: true,
    },
    id: {
        type: String,
        unique: true,
        required: true,
    },
    upi: {
        type: String,
        unique: true,
        required: true,
    },
    yearLevel: {
        type: Number,
        required: false,
    },
    // TODO: Create Plan Model and change to objectId once Plan has been implemented
    plans: {
        type: [Object],
        ref: "Plan",
        required: false,
    },
});

studentSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Student", studentSchema);
