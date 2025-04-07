import React from "react";
import bannerSectionImage from "../assets/landingPageImages/bannerSection.png";
import { Link } from "react-router-dom";
import rightArrow from "../assets/rightArrow.png";

const BannerSection = () => {
    return (
        <div className="flex flex-col sm:flex-row h-[400px] sm:h-[450px] w-full bg-gray-50">
            <div className="h-1/2 sm:h-full w-full sm:w-1/2">
                <img src={bannerSectionImage} alt="Left" className="w-full h-full object-cover" />
            </div>

            <div className="h-1/2 sm:h-full w-full sm:w-1/2 bg-white flex flex-col justify-center px-6 sm:px-[4rem]">
                <div className="w-full sm:w-[65%] flex flex-col gap-3">
                    <h2 className="text-xl md:text-2xl font-bold text-blue-400">
                        SALE UP T0 50% OFF
                    </h2>
                    <p className="font-semibold text-3xl">HUNDREDS of NEW lower prices!</p>
                    <p className="text-base">
                        It’s more affordable than ever to give every room in your home a stylish
                        makeover
                    </p>
                    <Link
                        to="/products"
                        className="flex items-center md:text-lg font-medium underline transition text-gray-800"
                    >
                        More Products
                        <img src={rightArrow} alt="arrow" className="w-5 h-5 md:w-6 md:h-6 ml-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BannerSection;