import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/authContext";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingCircle from "../Components/LoadingCircle";

const Login = () => {

  // Use navigate for navigation
  const navigate = useNavigate();

  // Auth user data
  const { userData, setuserData, loginUser, setUserLogin } =
    useContext(AuthContext);

  // States
  const [inputs, setinputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setloading] = useState(false);

  // Handle change function
  const handleChange = (e) => {
    setinputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // Sumbit Data to backend
  const submitData = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      if (!inputs.email || !inputs.password || !inputs.confirmPassword) {
        toast.error("Please fill all fields");
      }
      await axios
        .post(`http://localhost:5000/api/user/login`, inputs, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.success) {
            setuserData(res.data);
            loginUser();
            toast.success(res.data.message);
            navigate("/");
            setloading(false);
          } else {
            toast.error(res.data.message);
            setloading(false)
          }
        });
    } catch (error) {
      toast.error(error.response.data.message);
      setloading(false)
    }
  };

  // If loading is true cloading appear
  if (loading) {
    return (
      <div className="h-screen w-full">
        <LoadingCircle />
      </div>
    );
  }

  return (
    <>
      <div className="main h-screen w-full flex items-center justify-between px-10">
        {/* Content show in desktop or large devices */}
        <div className="right hidden h-full w-[50%] lg:flex flex-col justify-center items-start gap-6">
          <h1 className="text-4xl lg:text-6xl font-semibold  text-primary text-center lg:text-left">
            Login!
          </h1>
          <p className="text-lg text-left">
            Let's register to create blogs with your own words. Share your words
            with other.
          </p>
        </div>

        {/* From that use for submit data to backend */}
        <div className="left h-full w-full lg:w-[50%] flex justify-center items-center">
          <form
            onSubmit={submitData}
            className="w-full md:w-[50%] py-2 px-4 border-2 border-primary rounded-md flex flex-col justify-between items-center gap-2"
          >
            <h1 className="text-center text-2xl font-bold text-primary ">
              Login
            </h1>
            <input
              className="px-2 py-2 bg-stone-50 outline-none border-b border-primary w-full"
              type="email"
              placeholder="Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
            />
            <input
              className="px-2 py-2 bg-stone-50 outline-none border-b border-primary w-full"
              type="text"
              placeholder="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
            <input
              className="px-2 py-2 bg-stone-50 outline-none border-b border-primary w-full"
              type="text"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={inputs.confirmPassword}
              onChange={handleChange}
            />

            <p className="w-full text-center">
              Want account?{" "}
              <Link to={"/register"} className="text-primary font-semibold">
                Register
              </Link>
            </p>
            <button className="w-full bg-primary text-stone-50 font-semibold py-2 px-4 rounded-md">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
