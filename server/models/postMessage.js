//This document creates a mongoose schema and model for sending documents using http POST requests and exports it

import mongoose from "mongoose";

//schemas allow us to create an outline for the shape of our MongoDB collection
//The selected file section could be a cause for the empty objects on post requests --*!
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String], //array of strings
  selectedFile: String,
  likes: {
    //likeCount is an object
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
