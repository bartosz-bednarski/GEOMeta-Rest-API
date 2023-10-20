const express = require("express");
const usersControllers = require("../controllers/users-controllers");
const forumControllers = require("../controllers/forum-controllers");
const router = express.Router();

router.post(
  "/createTopic",
  usersControllers.authenticateToken,
  forumControllers.createTopic
);
router.get("/getTopics", forumControllers.getTopics);
module.exports = router;
