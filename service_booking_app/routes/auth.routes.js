const express = require("express");
const { signup, login, refresh } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refresh);

module.exports = router;
