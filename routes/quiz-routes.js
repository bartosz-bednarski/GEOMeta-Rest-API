const express = require("express");
const usersControllers = require("../controllers/users-controllers");
const quizControllers = require("../controllers/quiz-controllers");
const router = express.Router();

router.get("/getFlags", quizControllers.getFlags);
router.post("/postFlags", quizControllers.postFlags);
router.post(
  "/postFlags/auth",
  usersControllers.authenticateToken,
  quizControllers.postFlagsAuth
);
router.get("/getEmblems", quizControllers.getEmblems);
router.post("/postEmblems", quizControllers.postEmblems);
router.post(
  "/postEmblems/auth",
  usersControllers.authenticateToken,
  quizControllers.postEmblemsAuth
);
module.exports = router;
