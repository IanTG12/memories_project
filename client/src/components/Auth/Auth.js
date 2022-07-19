import React from "react";
import { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
  cardClasses,
} from "@mui/material";

import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Input from "./Input";

import LockIcon from "@mui/icons-material/Lock";
import Icon from "./icon";
import AuthStyle from "./auth_sty";
import { ClassNames } from "@emotion/react";
import { signin, signup } from "../../actions/auth";

const formStyle = AuthStyle.form;
const submitStyle = AuthStyle.submit; //!empty
const paperStyle = AuthStyle.paper;
const avatarStyle = AuthStyle.Avatar; //!empty
const googleButton = AuthStyle.googleButton; //!empty

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

//Todo -------------
//>> Check how to apply theme to all elements
//X - add all the styling using the style prop instead of the hook method shown in the vid - X
//! - Google Auth causes pop up error in browser

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [newAccount, setNewAccount] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  // const history = useHistory();
  const navigate = useNavigate();

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newAccount) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
    console.log(formData);
  };
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const switchMode = () => {
    setNewAccount((prevAccount) => !prevAccount);
    setShowPassword(false);
  };
  //^ Google Succsess and failure functions disabled-----
  // const googleSuccess = async (res) => {
  //     const result = res?.profileObj;
  //     const token = res?.tokenId;
  //     try {
  //       dispatch({ type: "AUTH", data: { result, token } });
  //     } catch (error) {
  //       console.log(error);
  //     }
  // };

  // const googleFailure = (error) => {
  //   console.log("Google Sign In Failed");
  //   console.log(error);
  // };

  //newAccount determines if we go to the Sign in form or the Sign up form

  const state = null;
  return (
    <Container component="main" maxWidth="xs">
      <Paper style={paperStyle} elevation={3}>
        <Avatar style={avatarStyle}>
          <LockIcon />
        </Avatar>
        <Typography variant="h5">
          {newAccount ? "Sign up" : "Sign In"}
        </Typography>
        <form style={formStyle} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {newAccount && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />

                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {newAccount && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <GoogleLogin
            clientId="237642507309-h1dfedin3qtgmei4scgbgk9uabmduqh3.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                style={googleButton}
                color="primary"
                //? fullwidth - Causes warning ---------<
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            // onSuccess={googleSuccess}
            // onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={submitStyle}
          >
            {newAccount ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {newAccount
                  ? "Have Account? Sign In"
                  : "New User? Create Account"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
