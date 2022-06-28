//This document declares and exports 3 different functions.  Each are used to handle a different type of http requests
//This document uses axios to handle different http requests, exporting the function and params to the actions/posts.js file

import axios from "axios"; //axios provides the ability to send http requests from node.js - used to make api calls

//this is the url pointing to our backend route
const url = "http://localhost:5000/posts";
//axios.get performs a get request at the provided url
export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => {
  console.log(newPost);
  return axios.post(url, newPost);
};
export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
