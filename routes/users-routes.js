const express = require("express");

const usersControllers = require("../controllers/users-controllers");
const router = express.Router();

router.post("/register", usersControllers.registerUser);
router.post("/login", usersControllers.loginUser);
module.exports = router;
