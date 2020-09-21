const express = require("express");
const router = express.Router();

router.use("/course", require("./course-route"));
router.use("/programmedegree", require("./programme-degree-route"));
router.use("/student", require("./student-route"));
router.use("/plan", require("./plan-route"));
router.use("/uni", require("./uni-api-route"));

module.exports = router;
