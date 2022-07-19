//This document handles the logic for single posts.
//This document is responsible for creating the strcture of a card element menat to hold a single memory
//This document is responsible for populating individual cards with their information sent via the text fields of the form component
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import React from "react";
import { Box } from "@mui/material";
import { formatMs, requirePropFactory } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";

import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  const imagePost = post.selectedFile;
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    //Card uses card stle
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "15px",
        height: "100%",
        postition: "relative",
      }}
    >
      {/* CardMedia uses the media class */}
      <CardMedia
        style={{
          height: "50%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          backroundColor: "rgba(0, 0, 0, 0.5)",
          backgroundBlendMode: "darken",
          //OLD STYLES
          // height: "50%",
          // width: "50%",
          // display: "flex",
          // flexDirection: "column",
          // justifyContent: "space-between",
          // position: "relative",
        }}
        component="img"
        src={imagePost}
        // title={post.title}
      />
      {/* this div uses the overlay class */}
      <div
        style={{
          position: "relative",

          left: "20px",
          color: "white",
        }}
      >
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      {/* this div uses the overlay2 class */}
      <div
        style={{
          postition: "absolute",
          top: "20px",
          right: "20px",
          color: "white",
        }}
      >
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => setCurrentId(post._id)}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      {/* this div uses the details class */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px",
        }}
      >
        {/* Loops over each tag adds # */}
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      {/* This TYPO uses the title class */}
      <Typography style={{ padding: "0 16px" }} variant="h5" gutterBottom>
        {" "}
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {post.message}
        </Typography>
      </CardContent>
      {/* cardActions uses the cardActions class */}
      <CardActions
        style={{
          padding: "0 16px, 8px, 16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => {
            dispatch(likePost(post._id));
          }}
        >
          <Likes />
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(deletePost(post._id))}
        >
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
