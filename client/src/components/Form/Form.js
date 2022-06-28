//This document creats the structure for my form.
//This document also dispatches actions based on what is entered within the forms text fields

import React, { useState, useEffect } from "react";
import myStyles from "./styles";
import { Box } from "@mui/material";
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { current } from "@reduxjs/toolkit";

const formStyles = myStyles.test;

//Form is accepting currentId, and setCurrentId as props
const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  //gets data for updated post
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    //if a post exists setPostData which is declared above as a state, populate the information with the updated post data
    if (post) setPostData(post);
    //[post] is a dependancy array, the variable within the dependency array tells useEffect() to run when said variable changes
  }, [post]);

  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    console.log(postData.selectedFile);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //if we have a currentId then dispatch updatePost, else dispatch createPost
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
  };

  return (
    //Paper is like a div with off white backround
    //Paper uses the PAPER class - for some reason cant use theme
    <Paper>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        {/* if currentId exists, then display "Editing a Memory", if there is no currentId (memory does not exist and needs to be created), display "Creating a memory" */}
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        {/* Tags must be comma seperated */}
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(", ") })
          }
        />
        {/* this DIV uses the fileInput class */}
        <div style={{ width: "97%", margin: "10px 0" }}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        {/* This Button uses the buttonSubmit class */}
        <Button
          style={{
            marginBottom: 10,
          }}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
