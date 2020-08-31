const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

/**
 * @swagger
 *  components:
 *   $ref: './regulation.js/#components'
 *   schemas:
 *    programmeDegree:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        name:
 *          type: string
 *          description: name of this programme
 *        regulations:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Regulation'
 *          description: all the regulations for this particular programme
 *        defaultPlan:
 *          type: object
 *          description: the default plan associated with this programme
 */
const programmeDegreeSchema = mongoose.Schema({
    name: String,
    regulations: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Regulation",
        required: false,
    },
    // TODO: Create Plan Model
    defaultPlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan",
        required: false,
    },
});

programmeDegreeSchema.plugin(uniqueValidator);

module.exports = mongoose.model("ProgrammeDegree", programmeDegreeSchema);
