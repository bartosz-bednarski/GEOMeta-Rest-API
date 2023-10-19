const express = require("express");

const usersControllers = require("../controllers/users-controllers");
const router = express.Router();

router.post("/register", usersControllers.registerUser);
router.post("/login", usersControllers.loginUser);
router.get(
  "/check",
  usersControllers.authenticateToken,
  usersControllers.checkUserAuth
);
module.exports = router;
