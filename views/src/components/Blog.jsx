import React from 'react';
import blogImage from '../assets/blogimage.png'; // Adjust the path if needed
import blogData from '../sample_data/blog_data.js';
import Blog_card from './Blog_card';
import { FaAngleDown } from "react-icons/fa";


const Blog = () => {
  return (
    <div className='flex flex-col  h-[full] w-[full] gap-1 '>

      <div className="relative flex justify-center ">
        <img src={blogImage} alt="Blog Image" />
        <div className="absolute flex flex-col items-center justify-center h-full w-full gap-4">
          <p className="text-black flex flex-row gap-1"> <p className='text-gray-600'>Home </p> &gt; Blog</p>
          <h1 className="text-black text-4xl font-[470]">Our Blog</h1>
          <h3>Home ideas and design inspiration</h3>
        </div>
      </div>

      <div className='flex flex-col justify-center items-center gap-4 h-[93.4rem]'>


        <div className='h-[40px] w-[1124px] flex flex-row justify-between'>
          <div className=' w-[153px] flex flex-row gap-3 items-center'>
            <p>All Blogs</p>
            <p>Featured </p>
          </div>

          <div className='flex items-center '>
            <p className='pr-1'>Sort by </p>
            <FaAngleDown />
          </div>
        </div>

        <div className='flex items-center '>
          <div className='w-[1130px]  grid grid-cols-1 sm:grid-cols-3 gap-x-2 '>

            {blogData.map((blog, index) => (
              <Blog_card
                key={index}
                image={blog.image}
                title={blog.title}
                date={blog.date}
              />
            ))}

          </div>
        </div>

        <button className="px-6 py-2 rounded-full border hover:bg-black hover:text-white transition duration-200">
          Show More
        </button>
      </div>
    </div>
  );
};

export default Blog;