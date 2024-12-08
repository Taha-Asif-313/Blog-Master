import React from "react";
import HeroSection from "../Components/Home/HeroSection";
import Benifits from "../Components/Home/Benifits";
import AllBlogs from "../Components/Home/AllBlogs";
import ContentPage from "../Components/Home/ContentPage";

const Home = () => {
  return (
    <>
      <div className="main h-auto">
        <HeroSection />
        {/* hr for divide with bar*/}
        <hr className="bg-white w-full my-5" />
   <ContentPage/>
        <Benifits />
        <AllBlogs />
      </div>
    </>
  );
};

export default Home;
