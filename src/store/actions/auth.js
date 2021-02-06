import axios from "axios";

import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, email) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    email: email,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  // localStorage.removeItem("expirationDate");
  localStorage.removeItem("email");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

// export const checkAuthTimeout = (expirationTime) => {
//   return (dispatch) => {
//     setTimeout(() => {
//       dispatch(logout());
//     }, expirationTime * 1000);
//   };
// };

export const auth = (email, password) => {
  return async (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/session`,
        authData
      );

      console.log("response:", response.data);
      // const expirationDate = new Date(
      //   new Date().getTime() + response.data.expiresIn * 1000
      // );
      localStorage.setItem("token", response.data.token);
      // localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("email", response.data.email);
      dispatch(authSuccess(response.data.token, response.data.email));
      // dispatch(checkAuthTimeout(response.data.expiresIn));
    } catch (err) {
      dispatch(authFail(err.response.data.error));
    }
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      // const expirationDate = new Date(localStorage.getItem("expirationDate"));
      // if (expirationDate <= new Date()) {
      //   dispatch(logout());
      // } else {
      const email = localStorage.getItem("email");
      dispatch(authSuccess(token, email));
      // dispatch(
      //   checkAuthTimeout(
      //     (expirationDate.getTime() - new Date().getTime()) / 1000
      //   )
      // );
      // }
    }
  };
};
