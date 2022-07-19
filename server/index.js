//This document cretes a new express applications, enables body-parser, and uses mongoose to create a connection to our database
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import { useForkRef } from "@material-ui/core";

const app = express();

//app.use() allows us to bind application level middleware to the app object
//Sets up all routes to go to the /posts route

app.use(bodyParser.json({ limit: "30mb", extended: true })); //bodyParser set up to send requests
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
//CORS = system which transmits HTTP headers, determines whether browsers block frontend JS from accessing cross-origin requests
app.use(cors());
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

//express vesion can be used instead of bodyparser---
// app.use(express.json({ limit: "30mb", extended: true }));
// app.use(express.urlencoded({ limit: "30mb", extended: true }));
//---------------------------------------------------

const CONNECTION_URL =
  "mongodb+srv://IanRJS:JS123@cluster0.o5ubt.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;
//callback function = function passed to another functoin as an argument
mongoose
  .connect(CONNECTION_URL, { useNewURLParser: true, useUnifiedTopology: true })
  //.then = returns a promise, can contain callback functions for either failure or succsess
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  ) //${} = template strings, allows us to insert an object or other things within a string
  .catch((error) => console.log(error.message)); //.catch = handles the rejected/failure case regarding the .then promise

// mongoose.set('useFindAndModify', false); does not work causes a crash
