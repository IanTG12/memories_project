//This document declares and exports 3 different functions.  Each are used to handle a different type of http requests
//This document uses axios to handle different http requests, exporting the function and params to the actions/posts.js file

import axios from "axios"; //axios provides the ability to send http requests from node.js - used to make api calls

//this is the url pointing to our backend route
const url = "http://localhost:5000/posts";

const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});
//axios.get performs a get request at the provided url
export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);

//^ OLD METHOD ------
// export const fetchPosts = () => axios.get(url);
// export const createPost = (newPost) => {
//   console.log(newPost);
//   return axios.post(url, newPost);
// };
// export const updatePost = (id, updatedPost) =>
//   axios.patch(`${url}/${id}`, updatedPost);
// export const deletePost = (id) => axios.delete(`${url}/${id}`);
// export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
