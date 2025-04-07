import React from "react";
import bannerSectionImage from "../assets/landingPageImages/bannerSection.png";
import { Link } from "react-router-dom";
import rightArrow from "../assets/rightArrow.png";

const AboutUsBanner = () => {
    return (
        <div className="px-4 sm:px-6 lg:px-8 w-[85%] mx-auto">
            <div className="flex flex-col sm:flex-row w-full h-auto sm:h-[450px] bg-gray-50">
                <div className="w-full sm:w-1/2 h-[250px] sm:h-full">
                    <img
                        src={bannerSectionImage}
                        alt="Left"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="w-full sm:w-1/2 bg-gray-100 flex items-center justify-center p-6 sm:p-[4rem]">
                    <div className="w-full sm:w-[80%] flex flex-col gap-4 text-center sm:text-left">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">About Us</h2>
                        <p className="text-base sm:text-lg text-gray-700">
                            Decora is a modern home decor brand based in Patiala, India.
                        </p>
                        <p className="text-sm sm:text-base text-gray-600">
                            Our customer service is always prepared to support you 24/7.
                        </p>

                        <Link
                            to="/products"
                            className="flex items-center justify-center sm:justify-start text-sm sm:text-base font-medium underline text-gray-800 transition"
                        >
                            Shop Now
                            <img
                                src={rightArrow}
                                alt="arrow"
                                className="w-5 h-5 sm:w-6 sm:h-6 ml-1"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsBanner;
