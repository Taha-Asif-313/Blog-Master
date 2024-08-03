import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { AuthContext } from "../../Context/authContext";
import { PiBookOpenTextFill } from "react-icons/pi";

const NavBar = () => {
  // User login or not
  const { userData, isLogin } = useContext(AuthContext);
  
  // Login item list
  const loginItems = [
    { name: "Home", link: "/" },
    { name: "CreateBlog", link: "/createblog" },
    { name: "Blogs", link: "/blogs" },
    { name: "About", link: "/about" },
  ];

  // Logout item list
  const logoutIems = [
    { name: "Home", link: "/" },
    { name: "Blogs", link: "/blogs" },
    { name: "About", link: "/about" },
    { name: "Login", link: "/login" },
  ];

  // Login buttons
  const RegisterBtn = () => {
    return (
      <li>
        <Link
          to={"/register"}
          className="px-4 py-2 bg-primary font-semibold rounded-md text-stone-50"
        >
          Register
        </Link>
      </li>
    );
  };

  // Profile Pic
  const ProfilePic = () => {
    return (
      <div
        className="w-10"
        onClick={() => {
          navigate("/profile");
        }}
      >
        <img
          className="w-full rounded-full"
          src={"/default-profile.jpg"}
          alt=""
        />
      </div>
    );
  };

  // Menuopen state to check menu open or not
  const [menuOpen, setmenuOpen] = useState(false);

  // Toggle function
  const toggleMenu = () => {
    setmenuOpen(!menuOpen);
  };

  // Use Navigate hook for navigation
  const navigate = useNavigate();

  return (
    <>
      {/* Large devices navbar menu */}
      <nav
        className={`h-16 fixed bg-black text-stone-50 z-50 flex items-center justify-between py-5 px-2 lg:px-10 w-full`}
      >
        <div
          onClick={() => {
            navigate("/");
          }}
          className="logo cursor-pointer"
        >
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <PiBookOpenTextFill className="font-bold text-4xl text-primary" />{" "}
            Blog Master
          </h1>
        </div>

        {/* Menu icons  */}
        <div className="mobile-menu-icons px-[10px] block lg:hidden">
          {menuOpen ? (
            <IoCloseSharp
              onClick={toggleMenu}
              className="text-2xl font-semibold text-primary"
            />
          ) : (
            <FiMenu
              onClick={toggleMenu}
              className="text-2xl font-semibold text-primary"
            />
          )}
        </div>

        {/* List items for large devices */}
        <ul className="list-items hidden lg:flex justify-between items-center gap-5">
          {/* List items  */}
          {isLogin
            ? loginItems.map((item) => {
                return (
                  <li className="hover:scale-105 hover:text-primary hover:border-b border-stone-50 font-semibold transition-all duration-100">
                    <Link to={item.link}>{item.name}</Link>
                  </li>
                );
              })
            : logoutIems.map((item) => {
                return (
                  <li className="hover:scale-105 hover:text-primary hover:border-b border-stone-50 font-semibold transition-all duration-100">
                    <Link to={item.link}>{item.name}</Link>
                  </li>
                );
              })}

          {/* Navbar buttons */}
          {isLogin ? ProfilePic() : RegisterBtn()}
        </ul>
      </nav>

      {/* Small devices navbar  menu */}
      <nav
        className={`w-[200px] top-3 left-0 bg-black h-screen z-50 fixed flex-col transition-all ${
          menuOpen ? "flex" : "hidden"
        } items-center py-2 `}
      >
        {/* Logo */}
        <div className="logo">
          <h1 className="flex items-center gap-2 text-2xl font-bold text-stone-50">
            <PiBookOpenTextFill className="font-bold text-4xl text-primary" />
          </h1>
        </div>

        <div className="flex items-center flex-col-reverse w-full">
          {/* Items list */}
          <ul className="list-items w-full text-stone-50 flex flex-col justify-between items-start text-lg">
            {/* List items  */}
            {isLogin
              ? loginItems.map((item) => {
                  return (
                    <li className="w-full py-2 pl-5 border-b border-primary">
                      <Link className="w-full" to={item.link}>
                        {item.name}
                      </Link>
                    </li>
                  );
                })
              : logoutIems.map((item) => {
                  return (
                    <li className="w-full py-2 pl-5 border-b border-primary">
                      <Link to={item.link}>{item.name}</Link>
                    </li>
                  );
                })}
          </ul>

          {/* Navbar buttons */}
          <div className="buttons flex flex-col justify-start items-start my-4 gap-5 w-full pl-5">
            {isLogin ? ProfilePic() : RegisterBtn()}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
