import React, { createContext, useState } from "react";
import { useEffect } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // States

  const [userData, setuserData] = useState(() => {
    const savedData = localStorage.getItem("User");
    return savedData ? JSON.parse(savedData) : null;
  });
  console.log(userData);
  const [isLogin, setisLogin] = useState(() => {
    const savedData = localStorage.getItem("User");
    console.log("savedData",savedData);
    return savedData ? true : false;
  });

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
