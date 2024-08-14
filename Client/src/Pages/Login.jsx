import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/authContext";
import { PiBookOpenTextFill } from "react-icons/pi";
import toast from "react-hot-toast";
import LoadingCircle from "../Components/Loading/LoadingCircle";
import useLogin from "../Hooks/useLogin";

const Login = () => {
  // Use navigate for navigation
  const navigate = useNavigate();

  // Auth user data
  const { setuserData, loginUser } = useContext(AuthContext);

  // States
  const [inputs, setinputs] = useState({
    email: "",
    password: "",
  });

  // Handle change function
  const handleChange = (e) => {
    setinputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // Sumbit Data to backend
  const { data, loading, error, fetchData } = useLogin(
    "https://blog-master-server.vercel.app/api/user/login",
    inputs
  );

  if (data.success) {
    setuserData(data);
    loginUser();
    navigate("/");
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

  return (
    <>
      <div className="main h-screen w-full flex items-center justify-between px-5 lg:px-24">
        {/* Content show in desktop or large devices */}
        <div className="right hidden h-full w-[40%] lg:flex flex-col justify-center items-start gap-6">
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
        <div className="left h-full w-full lg:w-[60%] flex justify-center items-center">
          <form
            onSubmit={fetchData}
            className="w-full lg:w-[60%] py-2 px-4 border-2 border-primary rounded-lg flex flex-col gap-5 justify-between items-center "
          >
            <h1 className="text-center text-2xl lg:text-4xl font-bold text-primary ">
              Login
            </h1>
            <input
              className="px-2 py-2 bg-transparent outline-none border-b border-primary w-full"
              type="email"
              placeholder="Email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              required
            />
            <input
              className="px-2 py-2 bg-transparent outline-none border-b border-primary w-full"
              type="text"
              placeholder="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              required
            />

            <p className="w-full text-center">
              Want account?{" "}
              <Link to={"/signup"} className="text-primary font-semibold">
                SignUp
              </Link>
            </p>
            <button className="w-full text-zinc-900 bg-gradient-to-tr from-cyan-600 to-primary font-semibold py-2 px-4 rounded-md">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
