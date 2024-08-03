import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/authContext";

const HeroSection = () => {
  const {isLogin} = useContext(AuthContext)
  return (
    <>
      {/* Main hero section || hero image and welcome test */}
      <div className="main-hero px-14 lg:px-24 h-screen w-full flex justify-between items-center flex-col-reverse mt-14 lg:mt-0 lg:flex-row">
        <div className="hero-right h-full w-full lg:w-[50%] flex flex-col justify-center lg:items-start items-center gap-6 ">
          <h1 className="text-[36px] leading-[40px] lg:text-6xl font-bold text-center lg:text-left">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-tr from-cyan-600 to-primary">
              Blog Master !
            </span>
          </h1>
          <p className="text-lg text-center lg:text-left w-[80%]">
            Let's create blogs with your own words. Share your words with other.
          </p>
          <Link
            to={isLogin?"/profile":"/signup"}
            className="bg-gradient-to-tr from-cyan-600 to-primary text-zinc-900 font-bold px-5 py-2 rounded-md"
          >
            {isLogin?"Go to Profile":"Get Started"}
          </Link>
        </div>
        <div className="hero-left h-full w-full lg:w-[50%] flex justify-end items-center pt-10 lg:pt-0">
          <img
            className="object-contain h-full w-full"
            src="/hero1.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
