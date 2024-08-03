import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/authContext";
import axios from "axios";
import LoadingCircle from "../Components/Loading/LoadingCircle";
import useSignUp from "../Hooks/useSignUp";
import { PiBookOpenTextFill } from "react-icons/pi";

const SignUp = () => {
  // Use navigate for navigation
  const navigate = useNavigate();

  // States
  const [inputs, setinputs] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });

  // Handle change function
  const handleChange = (e) => {
    setinputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // Sumbit Data to backend

  const { data, loading, error, fetchData } = useSignUp(
    "https://blog-master-server.vercel.app/api/user/register",
    inputs
  );
  
  if (data.success) {
    navigate("/login");
  }

  // Retrun Loading component if loading is true
  if (loading) {
    return (
      <div className="h-screen w-full">
        <LoadingCircle />
      </div>
    );
  }

  // Retrun error if error occurs
  if (error) {
    toast.error(error);
  }

  return (
    <>
      <div className="main relative h-screen w-full text-white flex items-center justify-between px-5  lg:pb-10 py-32 lg:pt-32 lg:px-24">
        {/* Content show in desktop or large devices */}
        <div className="right h-full w-[40%] hidden md:flex flex-col justify-center items-start gap-6">
          <div className="logo cursor-pointer">
            <h1 className="flex items-center gap-2 text-4xl font-bold">
              <PiBookOpenTextFill className="font-bold text-4xl text-primary" />{" "}
              Blog Master
            </h1>
          </div>
          <p className="text-sm w-[80%]">
            Let's register to create blogs with your own words. Share your words
            with other.
          </p>
        </div>

        {/* From that use for submit data to backend */}
        <div className="left h-full w-full lg:w-[60%] flex items-center">
          <form
            onSubmit={fetchData}
            className="w-full py-2 px-4 rounded-lg flex flex-col justify-between  border border-primary items-center gap-2"
          >
            <h1 className="text-center py-3 w-full text-2xl lg:text-4xl text-primary font-bold ">
              SignUp
            </h1>

            <div className="div grid grid-cols-1 lg:grid-cols-2 w-full gap-5">
              <input
                className="px-2 py-2  bg-transparent text-white outline-none border-b border-primary w-full"
                type="text"
                placeholder="Full Name"
                name="fullname"
                value={inputs.fullname}
                onChange={handleChange}
                required
              />
              <input
                className="px-2 py-2  bg-transparent text-white outline-none border-b border-primary w-full"
                type="text"
                placeholder="Username"
                name="username"
                value={inputs.username}
                onChange={handleChange}
                required
              />
              <input
                className="px-2 py-2  bg-transparent text-white outline-none border-b border-primary w-full"
                type="text"
                placeholder="Email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                required
              />
              <input
                className="px-2 py-2  bg-transparent text-white outline-none border-b border-primary w-full"
                type="text"
                placeholder="Password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
                required
              />
              <input
                className="px-2 py-2 bg-transparent text-white outline-none border-b border-primary w-full"
                type="text"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={inputs.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="gender flex justify-between items-center my-5 gap-5">
              <p>Gender : </p>
              <select className="bg-transparent border items-start border-gray-400 text-white py-2 px-4 rounded">
                <option value="male" className="bg-black text-white">
                  Male
                </option>
                <option value="female" className="bg-black text-white">
                  Female
                </option>
              </select>
            </div>

            <p className="w-full font-medium text-center my-3">
              Already have an account?{" "}
              <Link to={"/login"} className="text-primary font-semibold">
                Login
              </Link>
            </p>
            <button
              type="submit"
              className="w-full text-zinc-900 bg-gradient-to-tr from-cyan-600 to-primary font-semibold my-3 py-2 px-4 rounded-md"
            >
              SignUp
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
