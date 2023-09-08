const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");
// <----------------------------- Routes ----------------------------->

router.post("/signup", authController.signup_POST);

router.post("/login", authController.login_POST);

// router.post("/logout", () => {});

module.exports = router;
