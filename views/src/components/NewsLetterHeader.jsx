import React from "react";
import NewsLetterImage from "../assets/newsLetterImage.png";
import NewsLetterIcon from "../assets/iconImages/mail.svg";

const NewsLetterHeader = () => {
  return (
    <div className="relative h-[22.5rem] md:h-auto bg-gray-100">
      {/* Background Image for desktop */}
      <img
        src={NewsLetterImage}
        alt="Newsletter Background"
        className="hidden md:block w-full h-[22.5rem] lg:h-full lg:w-full object-cover"
      />

      {/* Centered Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-8">
        <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl mb-2 font-semibold text-gray-900">
          Join Our Newsletter
        </h2>
        <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 text-gray-600">
          Sign up for deals, new products and promotions
        </p>

        <div className="flex items-center justify-center w-full sm:px-0">
          <div className="flex items-center bg-white rounded-md overflow-hidden shadow-md w-full sm:max-w-sm md:max-w-md">
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
