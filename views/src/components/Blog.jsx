import React from "react";
import blogImage from "../assets/blogImages/blogimage.png";
import blogData from "../sample_data/blog_data.js";
import Blog_card from "./Blog_card";
import { ReactComponent as Right } from "../assets/iconImages/right-pointer.svg";

const Blog = () => {
  return (
    <div className="flex flex-col h-full w-full px-8 lg:px-38 pb-20">
      {/* Hero Section */}
      <div className="mx-auto relative">
        <img
          src={blogImage}
          alt="Product Header"
          className="w-full h-[19.25rem] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 text-center">
          <div className="flex justify-center items-center text-sm text-gray-500 gap-1">
            <span className="flex items-center">
              Home
              <Right className="h-3 w-3 mx-1" />
            </span>
            <span className="text-black">Blog</span>
          </div>

          <h1 className="text-black text-2xl sm:text-4xl md:text-5xl font-bold">
            Our Blog
          </h1>
          <h3 className="text-sm sm:text-lg text-gray-700">
            Home ideas and design inspiration
          </h3>
        </div>
      </div>

      {/* Blog List Section */}
      <div className="flex flex-col justify-center items-center gap-6 w-full mx-auto py-8">
        {/* Tabs + Sort Section */}
        <div className="flex flex-row justify-between items-center w-full sm:px-0">
          {/* Tabs */}
          <div className="flex gap-6 items-center text-sm sm:text-base font-medium">
            {["All Blog", "Featured"].map((name) => (
              <button
                key={name}
                className={"pb-1 border-b-2 border-black text-black"}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6">
          {blogData.map((blog, index) => (
            <Blog_card
              key={index}
              image={blog.image}
              title={blog.title}
              date={blog.date}
            />
          ))}
        </div>

        {/* Show More Button */}
        <button className="px-6 py-2 rounded-full border-2 hover:bg-black hover:text-white transition duration-200 mt-6 sm:mt-8 text-sm sm:text-base cursor-pointer">
          Show More
        </button>
      </div>
    </div>
  );
};

export default Blog;
