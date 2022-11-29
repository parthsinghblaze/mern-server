import mongoose from "mongoose";
import postsModel from "../models/postsModel.js";

// getting all the posts
export const getPosts = async (req, res) => {
  try {
    const getAllPost = await postsModel.find();
    res.status(200).json(getAllPost);
  } catch (e) {
    res.status(404).json({
      message: e.message,
    });
  }
};

// creating the post
export const createPost = async (req, res) => {
  const post = {...req.body, userId: req.userId};
  const newPost = new postsModel(post);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

// updating the post
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).send("No post found");
  }

  const updatePost = await postsModel.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );

  await res.json(updatePost);
};

// deleteing the post
export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).send("No post found");
  }

  const deletePost = await postsModel.findByIdAndDelete(_id);

  res.json({
    message: "Deleted",
  });
};

// liking the post
export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).send("No post found");
  }

  const post = await postsModel.findById(_id);

  const updatePost = await postsModel.findByIdAndUpdate(
    _id,
    { likeCount: post.likeCount + 1 },
    { now: true }
  );

  await res.json(updatePost);
};

//get post by user
export const getPostByUser = async (req, res) => {
  const userId = req.userId;
  const posts = await postsModel.find({ userId }).sort({ createdAt: -1 })

  res.status(200).json({
    message: "ok",
    posts
  })
};
