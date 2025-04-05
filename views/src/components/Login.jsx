import React, { useState } from 'react';
import leftImg from '../assets/Left.png';
import { IoEyeOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Login = () => {
    const [view, setView] = useState(false);

    const toggleView = () => {
        setView(!view);
    };

    return (
        <div className="flex flex-col sm:flex-row h-screen w-full bg-gray-50">
            {/* Left Image */}
            <div className="h-[50vh] sm:h-full w-full sm:w-[50%]">
                <img
                    src={leftImg}
                    alt="Left"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right Side - Login Form */}
            <div className="h-[50vh] sm:h-full w-full sm:w-[50%] bg-white flex flex-col justify-center px-6 sm:px-[4rem]">
                <div className="w-full sm:w-[65%] flex flex-col gap-4 sm:gap-[1rem] justify-center">
                    <h1 className="text-[#141718] text-4xl font-semibold">Login</h1>

                    <p className="text-[#6C7275] text-[0.9rem]">
                        Don't have an account yet?{' '}
                        <Link to={'/signup'} className="text-[#38CB89] cursor-pointer">
                            Sign up
                        </Link>
                    </p>

                    <form className="flex flex-col gap-[1.5rem]">
                        {/* Email Field */}
                        <input
                            type="text"
                            className="w-full border-b-2 border-b-[#E8ECEF] outline-none text-gray-600 py-2"
                            placeholder="Email"
                        />

                        {/* Password Field with Icon */}
                        <div className="relative w-full">
                            <input
                                type={view ? "text" : "password"}
                                className="w-full border-b-2 border-b-[#E8ECEF] outline-none text-gray-600 py-2 pr-10"
                                placeholder="Password"
                            />
                            <IoEyeOutline
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                                onClick={toggleView}
                            />
                        </div>

                        {/* Login Button */}
                        <button className="w-full bg-black text-white text-[0.9rem] py-3 rounded-md hover:bg-gray-800 transition">
                            Login
                        </button>

                        {/* Forgot Password */}
                        <span className="text-[#141718] text-[0.9rem] font-semibold cursor-pointer hover:underline">
                            Forgot Password?
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
