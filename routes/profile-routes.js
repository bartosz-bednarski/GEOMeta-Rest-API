const express = require("express");
const usersControllers = require("../controllers/users-controllers");
const profileControllers = require("../controllers/profile-controllers");
const router = express.Router();
router.get(
  "/getProfile",
  usersControllers.authenticateToken,
  profileControllers.getProfile
);
router.post(
  "/changePassword",
  usersControllers.authenticateToken,
  profileControllers.changePassword
);
router.post(
  "/changeShortName",
  usersControllers.authenticateToken,
  profileControllers.changeShortname
);
module.exports = router;
