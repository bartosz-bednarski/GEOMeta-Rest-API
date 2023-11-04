const express = require("express");
const usersControllers = require("../controllers/users-controllers");
const profileControllers = require("../controllers/profile-controllers");
const router = express.Router();

router.post(
  "/changePassword",
  usersControllers.authenticateToken,
  profileControllers.changePassword
);
module.exports = router;
