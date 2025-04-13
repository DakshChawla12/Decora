import React, { useState, useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import { Link } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../assets/iconImages/search.svg";
import { ReactComponent as UserIcon } from "../assets/iconImages/profile.svg";
import { ReactComponent as BagIcon } from "../assets/iconImages/bag.svg";
import { ReactComponent as HamburgIcon } from "../assets/iconImages/hamburger.svg";
import { ReactComponent as UnionIcon } from "../assets/iconImages/close.svg";
import { ReactComponent as InstaIcon } from "../assets/iconImages/instagram.svg";
import { ReactComponent as FacebookIcon } from "../assets/iconImages/facebook.svg";
import { ReactComponent as YoutubeIcon } from "../assets/iconImages/youtube.svg";
import { ReactComponent as HeartIcon } from "../assets/iconImages/heart.svg";

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { handleNavigate } = useContext(StoreContext);
    const token = localStorage.getItem("token");

    return (
        <>
            <nav className="w-full px-8 md:px-28 lg:px-38 py-4 flex justify-between items-center">
                <div
                    className="text-[1.5rem] font-bold cursor-pointer"
                    onClick={() => handleNavigate("/")}
                >
                    Decora
                </div>

                <div className="hidden lg:flex space-x-8 text-sm font-medium text-gray-500">
                    <Link to="/" className="text-black">
                        Home
                    </Link>
                    <Link to="/shop" className="text-black">Shop</Link>
                    <Link to="/blog" className="text-black">Blog</Link>
                    <Link to="/contact" className="text-black">Contact Us</Link>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="lg:w-full mx-auto hidden md:flex items-center lg:justify-between space-x-4">
                        {token ? (
                            <>
                                <SearchIcon className="cursor-pointer w-5 h-5" />
                                <UserIcon
                                    className="cursor-pointer w-5 h-5"
                                    onClick={() => handleNavigate("/profile")}
                                />
                                <div
                                    className="relative cursor-pointer"
                                    onClick={() => handleNavigate("/cart")}
                                >
                                    <BagIcon className="w-5 h-5" />
                                </div>
                            </>
                        ) : (
                            <button
                                onClick={() => handleNavigate("/login")}
                                className="px-4 py-2 text-sm font-medium bg-black text-white rounded-md"
                            >
                                Sign In
                            </button>
                        )}
                    </div>

                    <button onClick={() => setMenuOpen(true)} className="block md:hidden">
                        <HamburgIcon className="h-6 w-6" />
                    </button>
                </div>
            </nav>

            {menuOpen && (
                <div className="fixed inset-0 z-50 flex">
                    <div
                        className="w-[10%] h-screen bg-black/30 backdrop-blur-sm"
                        onClick={() => setMenuOpen(false)}
                    ></div>

                    <div className="w-[90%] h-screen bg-white p-6 flex flex-col justify-between overflow-y-auto">
                        <div>
                            <div className="flex justify-between items-center mb-5">
                                <div className="text-xl font-bold">Decora</div>
                                <button onClick={() => setMenuOpen(false)}>
                                    <UnionIcon className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="flex items-center border px-3 py-3 rounded-md mb-6">
                                <SearchIcon className="h-4 w-4 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-full text-xs outline-none"
                                />
                            </div>

                            <div className="flex flex-col space-y-4 text-sm font-medium text-gray-800">
                                <Link
                                    className="border-b pb-4 border-gray-300"
                                    to="/"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    className="border-b pb-4 border-gray-300"
                                    to="/shop"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Shop
                                </Link>
                                <Link
                                    className="border-b pb-4 border-gray-300"
                                    to="/blog"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Blogs
                                </Link>
                                <Link
                                    className="border-b pb-4 border-gray-300"
                                    to="/contact"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>

                        <div>
                            <div className="mt-6 space-y-4 text-sm">
                                <div
                                    className="flex justify-between items-center border-b pb-4 border-gray-300 cursor-pointer"
                                    onClick={() => handleNavigate("/cart")}
                                >
                                    <span className="text-gray-500">Cart</span>
                                    <div className="relative">
                                        <BagIcon className="h-5 w-5" />
                                    </div>
                                </div>

                                <div className="flex justify-between items-center border-b pb-4 border-gray-300" onClick={() => { handleNavigate('/profile') }}>
                                    <span className="text-gray-500">Profile</span>
                                    <div className="relative">
                                        <UserIcon className="h-5 w-5" />
                                    </div>
                                </div>

                                {!token && (
                                    <button className="w-full bg-black text-white py-2 rounded-md font-medium">
                                        Sign In
                                    </button>
                                )}
                            </div>

                            <div className="flex space-x-4 pt-6 text-xl">
                                <InstaIcon className="h-6 w-6" />
                                <FacebookIcon className="h-6 w-6" />
                                <YoutubeIcon className="h-6 w-6" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NavBar;
