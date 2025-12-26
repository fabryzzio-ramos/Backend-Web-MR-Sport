const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const dashboardController = require("../controllers/dashboard.controller");

router.get("/dashboard", auth, admin, dashboardController);

module.exports = router;