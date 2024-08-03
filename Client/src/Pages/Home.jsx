import React from "react";
import HeroSection from "../Components/Home/HeroSection";
import Benifits from "../Components/Home/Benifits";
import AllBlogs from "../Components/Home/AllBlogs";

const Home = () => {
  return (
    <>
      <div className="main h-auto">
        <HeroSection />
        {/* hr for divide with bar*/}
        <hr className="bg-white w-full my-5" />
        <Benifits />
        <h1 className="text-5xl lg:text-7xl text-center my-10 font-bold">
          Explore
        </h1>
        <AllBlogs />
      </div>
    </>
  );
};

export default Home;
