import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/authContext";
import axios from "axios";
import LoadingCircle from "../Components/LoadingCircle";

const Register = () => {
  // Use navigate for navigation
  const navigate = useNavigate();

  // Auth user data
  const { setuserData, setUserLogin } = useContext(AuthContext);

  // States
  const [inputs, setinputs] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [loading, setloading] = useState(false);

  // Handle change function
  const handleChange = (e) => {
    setinputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // Sumbit Data to backend
  const submitData = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      if (
        !inputs.fullname ||
        !inputs.username ||
        !inputs.email ||
        !inputs.password ||
        !inputs.confirmPassword ||
        !inputs.gender
      ) {
        toast.error("Please fill all fields");
      }
      await axios
        .post("https://blog-master-server.vercel.app/api/user/register", inputs)
        .then((res) => {
          if (res.data.success) {
            navigate("/login");
            setuserData(res.data);
            setUserLogin();
            setloading(false);
            toast.success(res.data.message);
          } else {
            toast.error("some error occurs!");
            setloading(false)
          }
        });
    } catch (error) {
       toast.error(error.response.data.message);
       setloading(false)
    }
  };

  // Retrun Loading component if loading is true
  if (loading) {
    return (
      <div className="h-screen w-full">
        <LoadingCircle />
      </div>
    );
  }

  return (
    <>
      <div className="main relative h-screen w-full flex items-center justify-between px-10">

        {/* Content show in desktop or large devices */}
        <div className="right h-full w-[50%] hidden md:flex flex-col justify-center items-start gap-6">
          <h1 className="text-4xl lg:text-6xl font-semibold text-primary text-center lg:text-left">
            Register!
          </h1>
          <p className="text-lg ">
            Let's register to create blogs with your own words. Share your words
            with other.
          </p>
        </div>

        {/* From that use for submit data to backend */}
        <div className="left h-full w-full md:w-[50%] flex justify-center items-center">
          <form
            onSubmit={submitData}
            className="w-full md:w-[50%] py-2 px-4 border-2 border-primary rounded-md flex flex-col justify-between items-start gap-2"
          >
            <h1 className="text-center w-full text-2xl text-primary font-bold ">
              Register
            </h1>

            <input
              className="px-2 py-2  bg-transparent text-black outline-none border-b border-primary w-full"
              type="text"
              placeholder="Full Name"
              name="fullname"
              value={inputs.fullname}
              onChange={handleChange}
            />
            <input
              className="px-2 py-2  bg-transparent text-black outline-none border-b border-primary w-full"
              type="text"
              placeholder="Username"
              name="username"
              value={inputs.username}
              onChange={handleChange}
            />
            <input
              className="px-2 py-2  bg-transparent text-black outline-none border-b border-primary w-full"
              type="text"
              placeholder="Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
            />
            <input
              className="px-2 py-2  bg-transparent text-black outline-none border-b border-primary w-full"
              type="text"
              placeholder="Password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
            <input
              className="px-2 py-2 bg-transparent text-black outline-none border-b border-primary w-full"
              type="text"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={inputs.confirmPassword}
              onChange={handleChange}
            />
            <div className="gender flex justify-between items-center gap-5">
              <p>Gender : </p>
            <select className="bg-transparent border items-start border-gray-400 text-gray-700 py-2 px-4 rounded">
      <option value="male" className="bg-white text-gray-700">Male</option>
      <option value="female" className="bg-white text-gray-700">Female</option>
    </select>
            </div>
             
            <p className="w-full font-medium text-start">
              Already have an account?{" "}
              <Link to={"/login"} className="text-primary font-semibold">
                Login
              </Link>
            </p>
            <button
              type="submit"
              className="w-full bg-primary text-stone-50 font-semibold py-2 px-4 rounded-md"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
