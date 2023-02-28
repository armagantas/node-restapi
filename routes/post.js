const express = require("express");
const {
  getPosts,
  createPosts,
  getDetail,
  deletePost,
  updatePost,
} = require("../controllers/postController.js");

const router = express.Router();

router.get("/getPosts", getPosts);
router.post("/createPost", createPosts);
router.get("/getDetail/:id", getDetail);
router.patch("/updatePost/:id", updatePost);
router.delete("/deletePost/:id", deletePost);

module.exports = router;
