const postController = require("../controllers/postController");
const express = require("express");
const router = express.Router();
const { authorization, authentication } = require("../middlewares/auth");

router.post("/", postController.createPostTransaction);
router.get("/", postController.getPost);
router.get("/:id", postController.getPostById);
router.delete("/:id", postController.removePost);
module.exports = router;
