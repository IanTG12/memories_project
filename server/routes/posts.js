//This document creates the different routes I use to interact with my database
//This document also imports the callback functions to be used when interacting with specific routes
import express from "express";
import auth from "../middleware/auth.js";
//imports route functionaly from the controllers file
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";

const router = express.Router();

// http://localhost:5000/posts

//use functionaly imported as getPosts from the controllers file
router.get("/", getPosts);
router.post("/", auth, createPost);
//patch is used for updating existing documents - Differs from put because patch is not meant to update the entire resource, just a part of it
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

//exports the entire router object
export default router;
