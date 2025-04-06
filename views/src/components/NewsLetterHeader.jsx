import React from "react";
import NewsLetterImage from "../assets/newsLetterImage.png";
import NewsLetterIcon from "../assets/newsLetterIcon.png";

const NewsLetterHeader = () => {
    return (
        <div className="w-full relative bg-gray-100">
            <img
                src={NewsLetterImage}
                alt="Newsletter Background"
                className="hidden md:block w-full h-auto object-cover max-h-[500px]"
            />

            <div className="relative container mx-auto px-4 py-8 md:py-0 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 text-center w-full max-w-4xl">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-2">
                    Join our newsletter
                </h2>
                <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
                    Sign up for deals, new products and promotions.
                </p>

                <div className="flex items-center justify-center w-full px-2 sm:px-0">
                    <div className="flex items-center bg-white rounded-md overflow-hidden shadow-md w-full max-w-[280px] sm:max-w-sm md:max-w-md">
                        <div className="p-2">
                            <img
                                src={NewsLetterIcon}
                                alt="Mail Icon"
                                className="w-5 h-5 sm:w-6 sm:h-6"
                            />
                        </div>
                        <input
                            type="email"
                            placeholder="Email address"
                            className="flex-grow p-2 text-sm sm:text-base text-black outline-none min-w-0"
                            aria-label="Email address"
                        />
                        <button className="bg-black text-white px-3 py-2 sm:px-4 text-sm sm:text-base hover:bg-gray-800 transition-all whitespace-nowrap">
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsLetterHeader;