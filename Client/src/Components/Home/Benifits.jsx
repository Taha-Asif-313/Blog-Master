import React from "react";

const Benifits = () => {
  return (
    <>
      {/* information about this website some features and benifits */}
      <div className="information-section flex flex-col gap-5 h-auto my-32 lg:my-32 px-5 lg:px-24 ">
        <h1 className="text-5xl lg:text-7xl text-center font-bold">
          Benefits
        </h1>
        <div className="benefit py-10 border-b border-primary flex items-center lg:flex-row flex-col-reverse gap-20 w-full h-auto">
          <div className="content w-[70%]">
            <div className="lg:text-5xl my-3 lg:text-left text-center text-2xl font-black text-transparent bg-gradient-to-tr from-cyan-600 to-primary bg-clip-text">
              Increase creativity!
            </div>
            <p className="lg:text-left text-lg text-center">   Blogging fuels creativity through diverse content creation,
            experimentation, reader interaction, and disciplined reflection.</p>
          </div>
          <div className="image lg:w-[30%]">
            <img className="w-44 lg:w-full lg:object-contain" src="/creativity.png" alt="" />
          </div>
        </div>
        <div className="benefit py-10 border-b border-primary flex flex-col-reverse lg:flex-row-reverse items-center gap-20 w-full h-auto">
          <div className="content w-[70%]">
            <div className="lg:text-5xl my-3 lg:text-left text-center text-2xl font-black text-transparent bg-gradient-to-tr from-cyan-600 to-primary bg-clip-text">
            Gain knowlegde!
            </div>
            <p className="lg:text-left text-lg text-center">Blogging expands knowledge by researching for content, organizing
              thoughts for clarity, and engaging with readers, fostering
              continuous learning.</p>
          </div>
          <div className="image lg:w-[30%]">
            <img className="w-44 lg:w-full drop-shadow-[2px_2px_cyan] object-contain" src="/gainKnowledge.png" alt="" />
          </div>
        </div>
        <div className="benefit py-10 border-b border-primary flex items-center flex-col-reverse lg:flex-row gap-20 w-full h-auto">
          <div className="content w-[70%]">
            <div className="lg:text-5xl my-3 lg:text-left text-center text-2xl font-black text-transparent bg-gradient-to-tr from-cyan-600 to-primary bg-clip-text">
            Amuse with blogs!
            </div>
            <p className="lg:text-left text-lg text-center">Blogs entertain and inform us with diverse content, from personal anecdotes to expert insights. They're like windows into different worlds, offering humor, knowledge, and connection in just a click.</p>
          </div>
          <div className="image lg:w-[30%]">
            <img className="w-44 lg:w-full drop-shadow-[2px_2px_3px_cyan] object-contain" src="/amuse.png" alt="" />
          </div>
        </div>
        <div className="benefit py-10 border-b border-primary flex items-center flex-col-reverse justify-center lg:flex-row-reverse  gap-20 w-full h-auto">
          <div className="content flex flex-col w-[70%]">
            <div className="lg:text-5xl my-3 lg:text-left text-center text-2xl font-black text-transparent bg-gradient-to-tr from-cyan-600 to-primary bg-clip-text">
            Intaract with other words!
            </div>
            <p className="lg:text-left text-lg text-center">Blogs foster interaction through comments, likes, and shares, creating vibrant communities. They invite dialogue, allowing readers to engage with authors and each other, exchanging ideas, perspectives, and sometimes even forming lasting connections.
            </p>
          </div>
          <div className="image lg:w-[30%]">
            <img className="w-44 lg:w-full drop-shadow-[2px_2px_3px_cyan] object-contain" src="/interact.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Benifits;
