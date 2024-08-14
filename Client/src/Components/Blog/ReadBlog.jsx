import React from "react";

const ReadBlog = ({ title, content, username, ProfilePic }) => {
  return (
    <div className="flex mt-20 flex-col lg:flex-row lg:mx-24 mx-5 ">
      <div className="flex w-full flex-col gap-5 h-screen overflow-y-auto p-4">
        <div className="flex items-center z-10">
          {/* User logo */}
          <div className="w-10 border border-primary h-10 rounded-full">
            <img className="w-full rounded-full" src={ProfilePic} />
          </div>

          {/* User id or Username */}
          <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-stone-50 mr-2 ">
            {username}
          </span>
          {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{date}</span> */}
        </div>
        <h1 className="text-4xl py-3 font-bold text-primary">{title}</h1>

        <p className="">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </p>
      </div>
    </div>
  );
};

export default ReadBlog;
