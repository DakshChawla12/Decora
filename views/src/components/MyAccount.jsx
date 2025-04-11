
import React, { useState } from "react";
import account_image from "../assets/account_image.png";
import { Link } from "react-router-dom";
import shape from "../assets/Shape.png";
import { MdFlipCameraIos } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const MyAccount = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleOldPasswordVisibility = () => {
        setShowOldPassword(!showOldPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleRepeatPasswordVisibility = () => {
        setShowRepeatPassword(!showRepeatPassword);
    };

    return (
        <div className='w-full h-full flex flex-col justify-center mx-auto gap-7'>
            {/* Title - using previous styling */}
            <div className='flex flex-col w-full md:w-[20%] h-[90px] mx-auto items-center justify-center'>
                <h1 className='text-3xl'>My Account</h1>
            </div>

            {/* Main content container */}
            <div className=' h-[35rem] flex flex-col lg:flex-row mx-auto w-[90%] sm:w-[85%] md:w-[80%] lg:w-[70%] gap-4 '>
                {/* Sidebar as dropdown on mobile/tablet, regular sidebar on desktop */}
                <div className='h-auto lg:h-[38rem] w-full lg:w-[25%] flex flex-col items-center mb-6 lg:mb-0'>
                    <div className='bg-gray-200 h-auto w-full sm:w-[80%] flex flex-col items-center py-4 lg:h-[65%]'>
                        <div className='flex flex-col items-center h-auto lg:h-[40%] justify-center'>
                            <div className="relative">
                                <img
                                    src={account_image}
                                    className='h-16 w-16 rounded-full object-cover'
                                    alt="Profile"
                                />
                                <div className="absolute cursor-pointer bottom-0 right-0 bg-black text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs">
                                    <MdFlipCameraIos />
                                </div>
                            </div>
                            <p className="mt-2">Sofia Havertz</p>
                        </div>

                        {/* Mobile/Tablet Dropdown */}
                        <div className="w-[90%] lg:hidden mt-4">
                            <button
                                onClick={toggleDropdown}
                                className="w-full flex items-center justify-between border border-gray-300 rounded-md p-3 bg-white"
                            >
                                <span className="font-medium">Account</span>
                                <span className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                                    <img src={shape} alt="" />
                                </span>
                            </button>

                            {isDropdownOpen && (
                                <div className="mt-1 border border-gray-300 rounded-md bg-white overflow-hidden">
                                    <Link className='block p-3 text-gray-700 hover:bg-gray-100 w-full text-left'>Address</Link>
                                    <Link className='block p-3 text-gray-700 hover:bg-gray-100 w-full text-left'>Orders</Link>
                                    <Link className='block p-3 text-gray-700 hover:bg-gray-100 w-full text-left'>WishList</Link>
                                    <Link className='block p-3 text-gray-700 hover:bg-gray-100 w-full text-left'>LogOut</Link>
                                </div>
                            )}
                        </div>

                        {/* Desktop sidebar links */}
                        <div className='h-auto lg:h-[60%] w-[75%] hidden lg:flex flex-col gap-y-3 mt-4 mx-auto items-center lg:items-start'>
                            <p className='font-semibold'>Account</p>
                            <div style={{ borderTop: '1px solid black', margin: '5px 0' }} className='w-full'></div>
                            <Link className='text-gray-500'> Address</Link>
                            <Link className='text-gray-500'> Orders</Link>
                            <Link className='text-gray-500'> WishList</Link>
                            <Link className='text-gray-500'> LogOut</Link>
                        </div>
                    </div>
                </div>

                {/* Form section */}
                <div className='h-auto lg:h-[38rem] w-full lg:w-[75%] flex flex-col items-start overflow-y-auto'>
                    <div className='w-full lg:w-[95%] h-full flex flex-col gap-5'>
                        <div className="font-semibold text-l">Account Details</div>
                        <form className="flex flex-col gap-3 w-full">
                            <div className="flex flex-col gap-2 w-full">
                                <p className="text-gray-500 font-bold text-[0.6rem]">FULL NAME*</p>
                                <input type="text" placeholder="John Doe"
                                    className="border ml-0.5 border-gray-300 rounded-[5px] focus:outline-none focus:ring-1 px-3 py-0.5 focus:ring-black w-[100%]" />
                                <p className="text-gray-500 italic text-[0.6rem]"> This will be how your name will be displayed in the account section and in reviews</p>
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <p className="text-gray-500 font-bold text-[0.6rem]">E-MAIL *</p>
                                <input type="email" placeholder="E-mail"
                                    className="border ml-0.5 border-gray-300 rounded-[5px] focus:outline-none focus:ring-1 px-3 py-0.5 focus:ring-black w-[100%]" />
                            </div>
                        </form>
                        <form className="flex flex-col gap-3 w-full">
                            <div className="font-semibold text-l">Password </div>

                            <div className="flex flex-col gap-2 w-full">
                                <p className="text-gray-500 font-bold text-[0.6rem]">OLD PASSWORD</p>
                                <div className="relative w-full">
                                    <input 
                                        type={showOldPassword ? "text" : "password"} 
                                        placeholder="Old Password"
                                        className="border ml-0.5 border-gray-300 rounded-[5px] focus:outline-none focus:ring-1 px-3 py-0.5 focus:ring-black w-[100%]" 
                                    />
                                    <button 
                                        type="button"
                                        onClick={toggleOldPasswordVisibility} 
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2  text-black"
                                    >
                                        {showOldPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <p className="text-gray-500 font-bold text-[0.6rem]">NEW PASSWORD</p>
                                <div className="relative w-full">
                                    <input 
                                        type={showNewPassword ? "text" : "password"} 
                                        placeholder="New Password"
                                        className="border ml-0.5 border-gray-300 rounded-[5px] focus:outline-none focus:ring-1 px-3 py-0.5 focus:ring-black w-[100%]" 
                                    />
                                    <button 
                                        type="button"
                                        onClick={toggleNewPasswordVisibility} 
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2  text-black"
                                    >
                                        {showNewPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <p className="text-gray-500 font-bold text-[0.6rem]">REPEAT NEW PASSWORD</p>
                                <div className="relative w-full">
                                    <input 
                                        type={showRepeatPassword ? "text" : "password"} 
                                        placeholder="Repeat New Password"
                                        className="border ml-0.5 border-gray-300 rounded-[5px] focus:outline-none focus:ring-1 px-3 py-0.5 focus:ring-black w-[100%]" 
                                    />
                                    <button 
                                        type="button"
                                        onClick={toggleRepeatPasswordVisibility} 
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black"
                                    >
                                        {showRepeatPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </form>

                        <button className="bg-[#181A1B] text-white w-full sm:w-1/2 md:w-1/3 lg:w-[18%] text-[0.8rem] px-4 py-2 rounded-[8px] hover:bg-[#ffffff] hover:text-black hover:border hover:border-black transition mb-6">
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;