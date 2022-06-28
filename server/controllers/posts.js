//This document handles interacting with the database, including saving entries or retrieving entries from my database
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

//exports all routing functonality into the posts file
export const getPosts = async (req, res) => {
  //run the statements witin the try block, if an excemption is found run the logic within the catch block
  try {
    const postMessages = await PostMessage.find(); //await keyword forces the function to wait for a promise to be recived before executing within an asyncronous function
    console.log(postMessages);
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
    console.log(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  //using object destructuring we rename our id to _id
  const { id: _id } = req.params;
  const post = req.body;
  //if the _id is not a valid mongoose object respond with 404 error
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");
  //else perform the update and store the newly updated post within the updatedPost variable
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id, //the ...post is a spread operator,  creates a shallow copy of the object,  allowing us to access each of its variables
    { ...post, _id }, //this line is giving us the entire post object and adding the _id
    {
      new: true,
    }
  );

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("No post with that id");

  await PostMessage.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  //postMessage allows us to send cross-domain data messages between two browser windows or same window and inner iframe?
  //IFRAME - inline frame - HTML element that loads another HTML page within an existing document
  const post = await PostMessage.findById(id);

  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    {
      likeCount: post.likeCount + 1,
    },
    { new: true }
  );

  res.json(updatedPost);
};
