//This document defines the handler functions for different http requests declared within the api/index.js file
//This document exports these function definitions
//The function getPosts is exported to App.js where it is dispatched
//The function createPosts is exported to components/Form/Form.js where it is dispatched

import * as api from "../api";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE_POST,
} from "../constants/actionTypes";
//Action creators - Functions that return an action
//Action - Object that contains the "type" and a "payload"
//THUNK - redux thunk allows us to specify an additional arrow function
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    //dispatch is used instead of return in thunk
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    console.log(post);
    const { data } = await api.createPost(post);
    dispatch({ type: "CREATE", payload: data }); //payload should be data but post is working for now
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    //returns a response destructured into returning data
    const { data } = await api.updatePost(id, post);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  window.location.reload(true);
  try {
    const { data } = await api.likePost(id, user?.token);
    dispatch({ type: "LIKE", payload: data });
  } catch (error) {
    console.log(error);
  }
};
