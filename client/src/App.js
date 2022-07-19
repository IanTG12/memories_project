//This document creates an instance of App() which styles many of the boilerplate ui elements,
//This document also dispatches the getPosts() function

import React from "react";
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

//import styles using SX notation
import myStyles from "./Styles"; // old method - import useStyles from "./Styles"; DOES NOT WORK

//styles to be applied to the neccisary element --- Must refrence via object destructuring using MUI SX prop
const styleImage = myStyles.image;

const styleHeading = myStyles.heading;
const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
