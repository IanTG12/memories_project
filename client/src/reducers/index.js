//this document imports the reducing functions from reducers/posts.js and combines them using the
//combineReducers() function, then exports it.

import { combineReducers } from "redux";

import posts from "./posts";
//combine reducers combines different reducing functions into a single reducing functions to be passed to the store
export default combineReducers({
  posts,
});
