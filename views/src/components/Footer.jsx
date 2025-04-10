import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as InstaIcon } from "../assets/iconImages/instagram.svg";
import { ReactComponent as FacebookIcon } from "../assets/iconImages/facebook.svg";
import { ReactComponent as YoutubeIcon } from "../assets/iconImages/youtube.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white px-6 lg:px-38 py-12 text-center lg:text-left">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-8 border-b border-gray-700 pb-10">
        {/* Brand Info */}
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <h2 className="text-3xl font-semibold tracking-wide">Decora</h2>
          <div className="w-6 h-px lg:w-px lg:h-6 bg-gray-500" />
          <p className="text-sm text-gray-300">Home Decoration Store</p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col lg:flex-row items-center gap-4 text-base">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/shop" className="hover:text-gray-300">Shop</Link>
          <Link to="/product" className="hover:text-gray-300">Product</Link>
          <Link to="/blog" className="hover:text-gray-300">Blog</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact Us</Link>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 flex flex-col lg:flex-row items-center lg:justify-between gap-6 text-sm text-gray-400">
        {/* Legal Info */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <span className="text-xs text-gray-500">
            © {currentYear} 3legant. All rights reserved
          </span>
          <div className="flex gap-4 font-semibold">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Use</Link>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6">
          <InstaIcon className="h-6 w-6 text-white" />
          <FacebookIcon className="h-6 w-6 text-white" />
          <YoutubeIcon className="h-6 w-6 text-white" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
