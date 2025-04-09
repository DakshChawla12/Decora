import React from "react";
import { Link } from "react-router-dom";
import instaIcon from "../assets/iconImages/instagram.svg";
import facebookIcon from "../assets/iconImages/facebook.svg";
import youtubeIcon from "../assets/iconImages/youtube.svg";

const Footer = () => {
    return (
        <footer className="bg-black text-white px-6 sm:px-10 lg:px-38 py-14 text-base">
            {/* Top Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-700 pb-10">
                {/* Logo + Tagline */}
                <div className="flex items-center gap-4 mb-6 md:mb-0">
                    <h2 className="text-3xl font-semibold">
                        Decora<span className="text-gray-400 text-lg align-top ml-1">®</span>
                    </h2>
                    <div className="h-6 w-px bg-gray-600" />
                    <p className="text-lg text-gray-300">Home Decoration Store</p>
                </div>

                {/* Navigation */}
                <div className="flex flex-wrap gap-8 text-lg">
                    <Link to="/" className="hover:text-gray-300">Home</Link>
                    <Link to="/shop" className="hover:text-gray-300">Shop</Link>
                    <Link to="/product" className="hover:text-gray-300">Product</Link>
                    <Link to="/blog" className="hover:text-gray-300">Blog</Link>
                    <Link to="/contact" className="hover:text-gray-300">Contact Us</Link>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row justify-between items-center pt-6 gap-4 md:gap-0">
                {/* Copyright + Links */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                    <span>Copyright © {new Date().getFullYear()} Decora All rights reserved</span>
                    <Link to="/privacy" className="hover:text-white font-semibold">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-white font-semibold">Terms of Use</Link>
                </div>

                {/* Icons */}
                <div className="flex gap-6">
                    <img src={instaIcon} alt="Instagram" className="h-6 w-6" />
                    <img src={facebookIcon} alt="Facebook" className="h-6 w-6" />
                    <img src={youtubeIcon} alt="YouTube" className="h-6 w-6" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
