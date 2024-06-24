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

  const setUserLogin = () => {
    window.localStorage.setItem("User",{
      fullname:userData.fullname,
      username:userData.username,
      userId:userData.userId,
      profilePic:userData.profilePic
    });
  };

  const setUserStatus = ()=>{
    const user = window.localStorage.getItem("User")
    if(user){
      setisLogin(true)
    }
    else{
      setisLogin(false)
    }
  }

  const logoutUser = () => {
    setisLogin(false);
    window.localStorage.removeItem("User");
  };

  useEffect(() => {
  
  
    return () => {
      setUserStatus()
    }
  }, [])
  
  return (
    <AuthContext.Provider
      value={{
        userData,
        setuserData,
        isLogin,
        loginUser,
        logoutUser,
        setUserLogin,
        setUserStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
