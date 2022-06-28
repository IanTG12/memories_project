//This document creates an instance of App() which styles many of the boilerplate ui elements,
//This document also dispatches the getPosts() function

import React from "react";
import { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import memories from "./images/memories.png";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux"; //allows us to dispatch an action
import { getPosts } from "./actions/posts";

//import styles using SX notation
import myStyles from "./Styles"; // old method - import useStyles from "./Styles"; DOES NOT WORK

//styles to be applied to the neccisary element --- Must refrence via object destructuring using MUI SX prop
const styleImage = myStyles.image;
const styleAppBar = myStyles.appBar;
const styleHeading = myStyles.heading;
const App = () => {
  const dispatch = useDispatch();
  //useState allows us to  track state within a function component
  //sets currentId as the current state, and setCurrentId is our function used to update our state
  const [currentId, setCurrentId] = useState(null);
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  //---------------------------------------
  return (
    <Container maxWidth="lg">
      {/* class = appbar */}
      <AppBar sx={{ ...styleAppBar }} position="static" color="inherit">
        {/* this Typography uses the heading class */}
        <Typography sx={{ ...styleHeading }} variant="h2" align="center">
          memories
        </Typography>
        {/* BOX used to apply sx prop to non MUI elements */}
        <Box
          //THIS box contents are styled image
          component="img"
          src={memories}
          alt="memories"
          sx={{ ...styleImage }}
        />

        {/* <img sx={{ ...styleImage, src: { memories }, alt: "memories" }} /> */}
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              {/* prop drilling because not currently using redux */}
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              {/* prop drilling because not currently using redux */}
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
