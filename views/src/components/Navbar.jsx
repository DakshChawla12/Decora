import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import searchIcon from "../assets/iconImages/searchIcon.png";
import userIcon from "../assets/iconImages/userIcon.png";
import bagIcon from "../assets/iconImages/bagIcon.png";
import cartItemsIcon from "../assets/iconImages/cartItemsIcon.png";
import hamburgIcon from "../assets/iconImages/hamburgIcon.png"
import unionIcon from "../assets/iconImages/unionIcon.png"
import { StoreContext } from "../Context/StoreContext";

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { handleNavigate, handleLogOut } = useContext(StoreContext);

    return (
        <div className="w-[85%] mx-auto px-4 sm:px-6 lg:px-8 bg-white">
            <nav className="w-full h-[58px] flex items-center justify-between py-4">
                <div className="text-3xl font-bold text-gray-800">Decora</div>

                <div className="hidden md:flex space-x-6 text-gray-600">
                    <Link to="/" className="hover:text-black font-medium">
                        Home
                    </Link>
                    <Link to="/products" className="hover:text-black font-medium">
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
                    <img src={cartItemsIcon} className="h-5 w-5" alt="Cart" onClick={() => handleNavigate('/cart')} />
                    <button className="h-[2rem] w-[6rem] text-white bg-red-500 rounded-md" onClick={() => { handleLogOut() }}>Log out</button>

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