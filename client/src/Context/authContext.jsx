import React, { createContext, useState } from "react";
import { useEffect } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  // States
  const [userData, setuserData] = useState({});
  const [isLogin, setisLogin] = useState(false);

  // Functions
  const loginUser = () => {
    setisLogin(true);
  };


  const logoutUser = () => {
    setisLogin(false);
    window.localStorage.removeItem("User");
  };

  
  return (
    <AuthContext.Provider
      value={{
        userData,
        setuserData,
        isLogin,
        loginUser,
        logoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
