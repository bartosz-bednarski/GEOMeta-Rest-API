const express = require("express");
const quizControllers = require("../controllers/quiz-controllers");
const router = express.Router();

router.get("/getFlags", quizControllers.getFlags);

module.exports = router;
