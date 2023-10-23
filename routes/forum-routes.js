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
router.post(
  "/:topicId/createComment/authorized",
  usersControllers.authenticateToken,
  forumControllers.createComment
);
router.post(
  "/:topicId/createComment/unauthorized",
  forumControllers.createComment
);
router.get("/:topicId/getComments", forumControllers.getComments);
module.exports = router;
