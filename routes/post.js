import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
  likePost,
  updatePost,
  getPostByUser
} from "../controllers/postsController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id",auth,deletePost);
router.patch("/:id/likePost", auth, likePost);
router.get("/userPost", auth, getPostByUser)

export default router;
