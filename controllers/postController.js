const postSchema = require("../models/post.js");

const createPosts = async (req, res) => {
  try {
    const newPost = await postSchema.create(req.body);
    res.status(201).json({
      newPost,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const getPost = await postSchema.find();
    res.status(200).json({
      getPost,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const detailPost = await postSchema.findById(id);
    res.status(200).json({
      detailPost,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatePost = await postSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "Product has been updated.",
      updatePost,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params;
    await postSchema.findByIdAndRemove(id);
    res.status(201).json({
      message: "Product has been removed.",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createPosts, getDetail, getPosts, updatePost, deletePost };
