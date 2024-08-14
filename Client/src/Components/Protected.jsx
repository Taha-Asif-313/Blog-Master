import React, { useContext } from "react";
import Login from "../Pages/Login";
import { AuthContext } from "../Context/authContext";

const Protected = (props) => {
  const { isLogin } = useContext(AuthContext);
  const { Component } = props;
  return isLogin ? <Component /> : <Login />;
};

export default Protected;
