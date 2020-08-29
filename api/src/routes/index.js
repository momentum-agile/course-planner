const express = require("express");
const router = express.Router();

router.use("/course", require("./course-route"));

module.exports = router;
