const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Regulation = require("./regulation");

/**
 * @swagger
 *  components:
 *   $ref: './regulation.js/#components'
 *   schemas:
 *    ProgrammeDegree:
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
 *          $ref: '#/components/schemas/Plan'
 *          description: the default plan associated with this programme
 */
const programmeDegreeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    regulations: {
        type: [Regulation],
        required: false,
    },
    // TODO: Create Plan Model and change to objectId once Plan has been implemented
    defaultPlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan",
        required: false,
    },
});

programmeDegreeSchema.plugin(uniqueValidator);

module.exports = mongoose.model("ProgrammeDegree", programmeDegreeSchema);
