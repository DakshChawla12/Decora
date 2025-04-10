import React from "react";
import { Link } from "react-router-dom";
import bannerSectionImage from "../assets/landingPageImages/bannerSection.png";
import rightArrow from "../assets/rightArrow.png";

const BannerSection = () => {
  return (
    <div className="flex flex-col sm:flex-row w-full bg-gray-100 items-center">
      {/* Left Image */}
      <div className="h-[23rem] sm:h-full w-full sm:w-1/2">
        <img
          src={bannerSectionImage}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Text Content */}
      <div className="w-full sm:w-1/2 h-[23rem] sm:h-full flex items-center p-8 sm:px-16 lg:px-20">
        <div className="w-full sm:w-[80%] flex flex-col gap-3">
          <h2 className="text-sm lg:text-base font-bold text-blue-500">
            SALE UP TO 35% OFF
          </h2>
          <p className="text-3xl lg:text-[2.5rem] font-semibold leading-tight">
            HUNDREDS of
            <br />
            New lower prices!
          </p>
          <p className="text-base lg:text-lg text-gray-700">
            It’s more affordable than ever to give every room in your home a
            stylish makeover
          </p>
          <Link
            to="/products"
            className="inline-flex items-center text-sm font-medium text-gray-800 border-b-2 w-fit hover:text-black transition"
          >
            <span>Shop Now</span>
            <img
              src={rightArrow}
              alt="Arrow"
              className="w-5 h-5 md:w-6 md:h-6 ml-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
