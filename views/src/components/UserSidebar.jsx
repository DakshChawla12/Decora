import React, { useState, useEffect } from "react";
import { MdFlipCameraIos } from "react-icons/md";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import account_image from "../assets/account_image.png";

const UserSidebar = ({ onSelectSection }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const decoded = jwtDecode(token);
                setIsAdmin(decoded.roleName === "admin");
            }
        } catch (err) {
            console.error("Invalid token:", err);
        }
    }, []); // runs once on component mount

    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

    return (
        <div className="h-auto lg:h-[38rem] w-full lg:w-[25%] flex flex-col items-center mb-6 lg:mb-0">
            <div className="bg-gray-200 h-auto w-full sm:w-[80%] flex flex-col items-center py-4 lg:h-[65%]">
                <div className="flex flex-col items-center h-auto lg:h-[40%] justify-center">
                    <div className="relative">
                        <img
                            src={account_image}
                            className="h-16 w-16 rounded-full object-cover"
                            alt="Profile"
                        />
                        <div className="absolute cursor-pointer bottom-0 right-0 bg-black text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs">
                            <MdFlipCameraIos />
                        </div>
                    </div>
                    <p className="mt-2">Sofia Havertz</p>
                </div>

                {/* Mobile Dropdown */}
                <div className="w-[90%] lg:hidden mt-4">
                    <button
                        onClick={toggleDropdown}
                        className="w-full flex items-center justify-between border border-gray-300 rounded-md p-3 bg-white"
                    >
                        <span className="font-medium">Account</span>
                        <span className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}>
                            ▼
                        </span>
                    </button>

                    {isDropdownOpen && (
                        <div className="mt-1 border border-gray-300 rounded-md bg-white overflow-hidden">
                            <button
                                onClick={() => {
                                    onSelectSection("Details");
                                    setDropdownOpen(false);
                                }}
                                className="block w-full text-left p-3 text-gray-700 hover:bg-gray-100"
                            >
                                Details
                            </button>

                            {isAdmin && (
                                <Link
                                    to="/admin"
                                    className="block w-full text-left p-3 text-gray-700 hover:bg-gray-100"
                                >
                                    Admin
                                </Link>
                            )}

                            <button
                                onClick={() => {
                                    onSelectSection("Orders");
                                    setDropdownOpen(false);
                                }}
                                className="block w-full text-left p-3 text-gray-700 hover:bg-gray-100"
                            >
                                Orders
                            </button>

                            <button
                                onClick={() => {
                                    onSelectSection("Logout");
                                    setDropdownOpen(false);
                                }}
                                className="block w-full text-left p-3 text-gray-700 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                {/* Desktop Sidebar */}
                <div className="h-auto lg:h-[60%] w-[75%] hidden lg:flex flex-col gap-y-3 mt-4 mx-auto items-center lg:items-start">
                    <p className="font-semibold">Account</p>
                    <div className="border-t border-black w-full my-1" />

                    <button
                        onClick={() => onSelectSection("Details")}
                        className="text-gray-500 hover:text-black transition-all"
                    >
                        Details
                    </button>

                    {isAdmin && (
                        <Link
                            to="/admin"
                            className="text-gray-500 hover:text-black transition-all"
                        >
                            Admin
                        </Link>
                    )}

                    <button
                        onClick={() => onSelectSection("Orders")}
                        className="text-gray-500 hover:text-black transition-all"
                    >
                        Orders
                    </button>

                    <button
                        onClick={() => onSelectSection("Logout")}
                        className="text-gray-500 hover:text-black transition-all"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserSidebar;
