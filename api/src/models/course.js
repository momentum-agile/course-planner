const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const courseSchema = mongoose.Schema({
    courseName: String,
});

courseSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Course", courseSchema);
