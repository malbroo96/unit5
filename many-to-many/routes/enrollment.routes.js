const express = require("express");
const router = express.Router();
const { enrollStudent } = require("../controllers/enrollment.controller");

router.post("/", enrollStudent);

module.exports = router;
