import React, { useState, useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import { Link } from "react-router-dom";
import searchIcon from "../assets/iconImages/search.svg";
import userIcon from "../assets/iconImages/profile.svg";
import bagIcon from "../assets/iconImages/bag.svg";
import hamburgIcon from "../assets/iconImages/hamburger.svg";
import unionIcon from "../assets/iconImages/close.svg";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { handleNavigate } = useContext(StoreContext);

  return (
    <>
      {/* Navbar */}
      <nav className="w-full px-10 md:px-28 lg:px-38 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">Decora</div>

        {/* Center Links (visible md and above) */}
        <div className="hidden lg:flex space-x-8 text-sm font-medium text-gray-500">
          <Link to="/" className="text-black">
            Home
          </Link>
          <Link to="/shop">Shop</Link>
          <Link to="/products">Product</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Icons (only show on md and above) */}
          <div className="hidden md:flex items-center space-x-4">
            <img
              src={searchIcon}
              alt="Search"
              className="h-5 w-5 cursor-pointer"
            />
            <img src={userIcon} alt="User" className="h-5 w-5 cursor-pointer" />

            <div className="relative cursor-pointer">
              <img onClick={() => handleNavigate("/cart")} src={bagIcon} alt="Bag" className="h-5 w-5" />
              <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                2
              </span>
            </div>
          </div>

          {/* Hamburger (only show below md) */}
          <button onClick={() => setMenuOpen(true)} className="block lg:hidden">
            <img src={hamburgIcon} alt="Menu" className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Slide-in Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="w-[10%] h-screen bg-black/30 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Slide-in Drawer */}
          <div className="w-[90%] h-screen bg-white p-6 flex flex-col justify-between overflow-y-auto">
            {/* Header */}
            <div>
              <div className="flex justify-between items-center mb-5">
                <div className="text-xl font-bold">Decora</div>
                <button onClick={() => setMenuOpen(false)}>
                  <img src={unionIcon} alt="Close" className="h-4 w-4" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="flex items-center border px-3 py-3 rounded-md mb-6">
                <img src={searchIcon} alt="Search" className="h-4 w-4 mr-2" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full text-xs outline-none"
                />
              </div>

              {/* Nav Links */}
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
                  to="/products"
                  onClick={() => setMenuOpen(false)}
                >
                  Products
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

            {/* Cart & Extras */}
            <div>
              <div className="mt-6 space-y-4 text-sm">
                <div
                  className="flex justify-between items-center border-b pb-4 border-gray-300"
                  onClick={() => handleNavigate("/cart")}
                >
                  <span className="text-gray-500">Cart</span>
                  <div className="relative">
                    <img src={bagIcon} alt="Cart" className="h-5 w-5" />
                    <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                      2
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-b pb-4 border-gray-300">
                  <span className="text-gray-500">Wishlist</span>
                  <i className="fa fa-heart-o text-xl" />
                </div>

                <button className="w-full bg-black text-white py-2 rounded-md font-medium">
                  Sign In
                </button>
              </div>

              {/* Social Icons */}
              <div className="flex space-x-4 pt-6 text-xl text-white">
                <i className="fa fa-instagram" />
                <i className="fa fa-facebook-square" />
                <i className="fa fa-youtube-play" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
