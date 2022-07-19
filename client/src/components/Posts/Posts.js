//This document is meant to handle POSTS (plural), it also selects the state
import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";
import PostsStyles from "./styles";
const postsStyles = PostsStyles.mainContainer;

//accepting setCurrentId as a prop
const Posts = ({ setCurrentId }) => {
  //useSelector allows me to extract data from the Redux store state
  const posts = useSelector((state) => state.posts); //This line runs the function useSelector and passes the state variable, it returns state.posts and stores it within a posts variable

  console.log("posts test");
  console.log(posts);
  return (
    //Below statement is a terrinary (conditional) operator, holds three operands.  A condition (!posts.length)
    //Followed by a "?".  If hte condition is truthy it executes the logic after the ?, else it executes
    //The logic after the :
    //Below - if posts.length = 0 then load the circularProgress tag, else
    !posts.length ? (
      <CircularProgress />
    ) : (
      //Creates a grid to hold the post requests as cards,  stretch prop makes the card stretch vertically, spacing seperates the cards
      //GRID uses the maincontainer style
      <Grid style={postsStyles} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
