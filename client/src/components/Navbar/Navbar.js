import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Button,
  Avatar,
  nativeSelectClasses,
  Typography,
  Toolbar,
} from "@mui/material";
import NavStyle from "./nav_sty";
import memoriesIMG from "../../images/memories.png";
import { Box } from "@mui/material";
import App from "../../App";
import { ClassNames } from "@emotion/react";
import { useDispatch } from "react-redux";

import decode from "jwt-decode";
import * as ActionType from "../../constants/actionTypes";

//instantiate styles for appbar
const appBarStyle = NavStyle.appBar;
const typographyStyle = NavStyle.heading;
const styleImage = NavStyle.image;
const div1Style = NavStyle.brandContainer;
const toolbarStyle = NavStyle.toolbar;
const profileStyle = NavStyle.profile;
const userNameStyle = NavStyle.userName;

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation;
  const navigate = useNavigate;

  const logout = () => {
    dispatch({ type: ActionType.LOGOUT });

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <AppBar style={appBarStyle} position="static" color="inherit">
      <div style={div1Style}>
        <Typography
          component={Link}
          to="/"
          style={typographyStyle}
          variant="h2"
          align="center"
        >
          memories
        </Typography>
        <img style={styleImage} src={memoriesIMG} alt="icon" height="60" />
      </div>
      <Toolbar style={toolbarStyle}>
        {user?.result ? (
          <div style={profileStyle}>
            <Avatar alt={user?.result.name} src={user?.result.imageUrl}>
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography style={userNameStyle} variant="h6">
              {user?.result.name}
            </Typography>
            <Button variant="contained" color="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
