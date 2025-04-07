import React from "react";
import { Link } from "react-router-dom";
import rightArrow from "../assets/rightArrow.png";
import blogData from "../sample_data/blog_data.js";
import Blog_card from "./Blog_card";

const BlogSection = () => {
    return (
        <div className="w-full px-4 md:px-16 lg:px-28 py-10">
            <div className="flex justify-between items-center w-full px-4 md:px-8 py-16">
                <div>
                    <h1 className="text-2xl md:text-4xl">Articles</h1>
                </div>

                <div className="flex items-center">
                    <Link
                        to="/blog"
                        className="flex items-center md:text-lg font-medium underline transition text-gray-800"
                    >
                        More Articles
                        <img src={rightArrow} alt="arrow" className="w-5 h-5 md:w-6 md:h-6 ml-1" />
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {blogData.slice(2, 6).map((blog, index) => (
                    <Blog_card key={index} image={blog.image} title={blog.title} />
                ))}
            </div>
        </div>
    );
};

export default BlogSection;
