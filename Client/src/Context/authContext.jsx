import React, { createContext, useState } from "react";
import { useEffect } from "react";
import Cookies from "universal-cookie";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const cookies = new Cookies();

  // States
  const [userData, setuserData] = useState(() => {
    const savedData = localStorage.getItem("User");
    return savedData ? JSON.parse(savedData) : null;
  });

  const [isLogin, setisLogin] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem("User"));
    return savedData === null ? true : false;
  });
  console.log(cookies.get("User"));

  // Use Effcet to store data
  useEffect(() => {
    localStorage.setItem("User", JSON.stringify(userData));
  }, [userData]);

  // Functions
  const loginUser = () => {
    setisLogin(true);
  };

  const logoutUser = () => {
    setisLogin(false);
    window.localStorage.removeItem("User");
  };

  setTimeout(() => {
    localStorage.removeItem("User");
  }, 1000 * 60 * 60);

  return (
    <AuthContext.Provider
      value={{
        userData,
        setuserData,
        isLogin,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
