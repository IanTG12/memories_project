import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });
    window.location.reload(true);
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });
  } catch (error) {
    console.log(error);
  }
};

//^ OLD METHOD-----
// import { AUTH } from "../constants/actionTypes";
// import * as api from "../api";

// //Action creators - functions that return an action
// export const signin = (formData, navigate) => async (dispatch) => {
//   try {
//     //log in user
//     navigate.push("/");
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const signup = (formData, navigate) => async (dispatch) => {
//   try {
//     //sign up user
//     navigate.push("/");
//   } catch (error) {
//     console.log(error);
//   }
// };
