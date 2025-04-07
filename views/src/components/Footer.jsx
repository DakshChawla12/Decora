import React from "react";
import { Link } from "react-router-dom";
import instaIcon from "../assets/iconImages/instaIcon.png";
import facebookIcon from "../assets/iconImages/facebookIcon.png";
import youtubeIcon from "../assets/iconImages/youtubeIcon.png";

const Footer = () => {
    return (
        <footer className="bg-black text-white px-4 sm:px-6 lg:px-28 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div className="mb-6 md:mb-0">
                    <h2 className="text-2xl font-bold">Decora</h2>
                    <p className="text-sm text-gray-400">Home Decor Store</p>
                </div>

                <div className="flex flex-wrap gap-4 md:gap-6 text-sm text-gray-400">
                    <Link to="/" className="hover:text-white">
                        Home
                    </Link>
                    <Link to="/product" className="hover:text-white">
                        Product
                    </Link>
                    <Link to="/shop" className="hover:text-white">
                        Shop
                    </Link>
                    <Link to="/blog" className="hover:text-white">
                        Blog
                    </Link>
                    <Link to="/contact" className="hover:text-white">
                        Contact Us
                    </Link>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6 space-y-4 md:space-y-0">
                <div className="flex flex-wrap gap-4 text-xs text-gray-300">
                    <span>© {new Date().getFullYear()} Decora. All rights reserved.</span>
                    <Link to="/privacy" className="hover:text-white font-semibold">
                        Privacy Policy
                    </Link>
                    <Link to="/terms" className="hover:text-white font-semibold">
                        Terms of Use
                    </Link>
                </div>

                <div className="flex space-x-4">
                    <img src={instaIcon} alt="Facebook" className="h-5 w-5" />
                    <img src={facebookIcon} alt="Instagram" className="h-5 w-5" />
                    <img src={youtubeIcon} alt="Twitter" className="h-5 w-5" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
