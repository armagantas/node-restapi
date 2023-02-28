const express = require("express");
const {
  getPosts,
  createPosts,
  getDetail,
  deletePost,
  updatePost,
  searchPost,
} = require("../controllers/postController.js");
const auth = require("../models/auth.js");

const router = express.Router();

router.get("/searchPost", searchPost);
router.get("/getPosts", getPosts);
router.post("/createPost", auth, createPosts);
router.get("/getDetail/:id", getDetail);
router.patch("/updatePost/:id", auth, updatePost);
router.delete("/deletePost/:id", auth, deletePost);

module.exports = router;
