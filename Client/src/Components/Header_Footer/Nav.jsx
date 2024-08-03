import React, { useContext, useState } from "react";
import { FaLock } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/authContext";
import axios from "axios";
import toast from "react-hot-toast";
import { PiBookOpenTextFill } from "react-icons/pi";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLogin, userData, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const logoutItems = [
    { name: "Home", url: "/" },
    { name: "Blogs", url: "/blogs" },
    { name: "About", url: "/about" },
  ];
  const loginItems = [
    { name: "Home", url: "/" },
    { name: "CreateBlog", url: "/createblog" },
    { name: "Blogs", url: "/blogs" },
    { name: "About", url: "/about" },
  ];

  const logOut = () => {
    axios
      .delete(`http://localhost:5000/api/user/logout/${userData.userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          navigate("/");
          toast.success(res.data.message);
          logoutUser();
        } else {
          toast.error(res.data.message);
        }
      });
  };
  return (
    <>
      {/* Dialog box to ask confirm or not */}
      <dialog id="my_modal_1" className="modal">
              <div className="modal-box bg-black border border-primary">
                <h3 className="font-bold text-lg text-white">
                  Want to logout?
                </h3>
                <div className="modal-action ">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button onClick={logOut} className="py-2 transition-all px-4 rounded-lg text-sm text-stone-50 bg-primary hover:bg-white hover:text-black mx-2">
                      Confirm
                    </button>
                    <button className="py-2 px-4 transition-all rounded-lg text-sm text-stone-50 bg-primary hover:bg-white hover:text-black">
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
      <nav className="nav fixed w-full z-20 flex justify-between items-center py-4 lg:py-4 px-6 lg:px-20 bg-zinc-950 text-white">
        <div className="nav-start-section lg:w-[30%] w-[45%]">
          <div
            onClick={() => {
              navigate("/");
            }}
            className="logo cursor-pointer"
          >
            <h1 className="flex items-center gap-2 font-bold">
              <PiBookOpenTextFill className="font-bold text-4xl text-primary" />{" "}
              <span className="text-sm lg:text-lg"> Blog Master</span>
            </h1>
          </div>
        </div>
        <div className="nav-middle-section hidden md:flex space-x-4 justify-center lg:w-[40%]">
          <ul className="list-items flex items-center justify-center gap-3 ">
            {isLogin
              ? loginItems.map((item) => {
                  return (
                    <Link
                      to={item.url}
                      className="list-item px-1 transition-all hover:border-b hover:text-primary border-primary cursor-pointer"
                    >
                      <li>{item.name}</li>
                    </Link>
                  );
                })
              : logoutItems.map((item) => {
                  return (
                    <Link
                      to={item.url}
                      className="list-item px-3 transition-all hover:border-b hover:text-primary border-primary cursor-pointer"
                    >
                      <li>{item.name}</li>
                    </Link>
                  );
                })}
          </ul>
        </div>
        <div className="nav-end-section items-end justify-end lg:w-[30%] w-[45%] hidden md:flex space-x-4">
          <div className="buttons hidden lg:flex items-center justify-end gap-2">
            {isLogin ? (
              <>
              <div className="w-10">
              <img
                  onClick={() => navigate("/profile")}
                  className="w-full rounded-full cursor-pointer border border-primary"
                  src={userData.profilePic}
                  alt=""
                />
              </div>
             
                <Link
                  onClick={() => document.getElementById("my_modal_1").showModal()}
                  className="singup-btn rounded-full py-1 px-5 transition-all bg-transparent border-2 border-primary cursor-pointer hover:bg-primary hover:text-black"
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={"/signup"}
                  className="singup-btn rounded-full py-1 px-5 font-medium transition-all bg-transparent cursor-pointer text-primary hover:bg-primary hover:font-normal hover:text-black"
                >
                  SignUp
                </Link>
                <Link
                  to={"/login"}
                  className="singup-btn rounded-full py-1 px-5 transition-all bg-transparent border-2 border-primary cursor-pointer hover:bg-primary hover:text-black"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="md:hidden z-50 flex items-center gap-4">
         {isLogin && <img
            className="w-10 rounded-full border border-primary"
            onClick={() => navigate("/profile")}
            src={userData.profilePic}
            alt=""
          />}
          <button className="text-white focus:outline-none z-10 text-2xl">
            {isOpen ? (
              <IoMdClose onClick={() => setIsOpen(!isOpen)} />
            ) : (
              <HiOutlineMenuAlt3 onClick={() => setIsOpen(!isOpen)} />
            )}
          </button>
        </div>

        {/* mobile menu */}
        {isOpen && (
          <div className="md:hidden w-[50%] flex flex-col justify-between py-20 gap-10 z-30 px-4 absolute bg-zinc-950 right-0 top-0  h-screen">
            <div className="links flex flex-col justify-center gap-2">
              {isLogin
                ? loginItems.map((item) => {
                    return (
                      <Link
                        to={item.url}
                        className="list-items text-center list-none py-1 px-5 bg-zinc-900 rounded-full transition-all hover:bg-primary cursor-pointer"
                      >
                        <li>{item.name}</li>
                      </Link>
                    );
                  })
                : logoutItems.map((item) => {
                    return (
                      <Link
                        to={item.url}
                        className="list-items text-center list-none py-1 px-5 bg-zinc-900 rounded-full transition-all hover:bg-primary cursor-pointer"
                      >
                        <li>{item.name}</li>
                      </Link>
                    );
                  })}
            </div>
            <div className="btns flex flex-col justify-center gap-2">
              {isLogin ? (
                <>
                  <Link
                     onClick={() => document.getElementById("my_modal_1").showModal()}
                    className="singup-btn text-center rounded-full py-1 px-5 transition-all bg-transparent border-2 border-primary cursor-pointer hover:bg-primary hover:text-black"
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={"/signup"}
                    className="singup-btn text-center rounded-full py-1 px-5 transition-all bg-transparent border-2 border-primary cursor-pointer hover:bg-primary hover:text-black"
                  >
                    SignUp
                  </Link>
                  <Link
                    to={"/login"}
                    className="singup-btn text-center rounded-full py-1 px-5 transition-all bg-transparent border-2 border-primary cursor-pointer hover:bg-primary hover:text-black"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Nav;
