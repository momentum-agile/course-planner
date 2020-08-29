const express = require("express");
const router = express.Router();
const LOGGER = require("../common/logger");
const Course = require("../models/course");

router.get("/", async (req, res) => {
    const courses = await Course.find();
    res.status(200).send({ courses });
});

module.exports = router;
