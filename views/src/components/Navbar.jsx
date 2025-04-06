import React, { useState } from "react";
import { Link } from "react-router-dom";
import searchIcon from "../assets/searchIcon.png";
import userIcon from "../assets/userIcon.png";
import bagIcon from "../assets/bagIcon.png";
import cartItemsIcon from "../assets/cartItemsIcon.png";
import hamburgIcon from "../assets/hamburgIcon.png"
import unionIcon from "../assets/unionIcon.png"

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="w-full px-4 sm:px-6 lg:px-28 bg-white shadow">
            <nav className="w-full h-[58px] flex items-center justify-between py-4">
                <div className="text-lg font-bold text-gray-800">Decora</div>

                <div className="hidden md:flex space-x-6 text-gray-600">
                    <Link to="/" className="hover:text-black font-medium">
                        Home
                    </Link>
                    <Link to="/product" className="hover:text-black font-medium">
                        Product
                    </Link>
                    <Link to="/shop" className="hover:text-black font-medium">
                        Shop
                    </Link>
                    <Link to="/contact" className="hover:text-black font-medium">
                        Contact Us
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <img src={searchIcon} className="h-5 w-5" alt="Search" />
                    <img src={userIcon} className="h-5 w-5" alt="User" />
                    <img src={bagIcon} className="h-5 w-5" alt="Bag" />
                    <img src={cartItemsIcon} className="h-5 w-5" alt="Cart" />

                    <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
                        {menuOpen ? (
                            <img className="h-4 w-4" src={unionIcon} />
                        ) : (
                            <img className="h-4 w-4" src={hamburgIcon} />
                        )}
                    </button>
                </div>
            </nav>

            {menuOpen && (
                <div className="flex flex-col items-center space-y-4 pb-4 md:hidden text-gray-700">
                    <Link
                        to="/"
                        className="hover:text-black font-medium"
                        onClick={() => setMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        to="/product"
                        className="hover:text-black font-medium"
                        onClick={() => setMenuOpen(false)}
                    >
                        Product
                    </Link>
                    <Link
                        to="/shop"
                        className="hover:text-black font-medium"
                        onClick={() => setMenuOpen(false)}
                    >
                        Shop
                    </Link>
                    <Link
                        to="/contact"
                        className="hover:text-black font-medium"
                        onClick={() => setMenuOpen(false)}
                    >
                        Contact Us
                    </Link>
                </div>
            )}
        </div>
    );
};

export default NavBar;