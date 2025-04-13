import React from "react";

import banner_1 from "../assets/landingPageImages/banner_1.png";
import banner_2 from "../assets/landingPageImages/bannerGrid1.png";
import banner_3 from "../assets/landingPageImages/bannerGrid2.png";
import { Link } from "react-router-dom";

const BannerGrid = () => {
  return (
    <div className="h-full w-full px-8 md:px-16 lg:px-38">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full h-full">
          <img
            src={banner_1}
            alt="Banner_1"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-7 left-8 lg:top-15 lg:left-12 text-black">
            <h2 className="text-2xl md:text-4xl font-semibold">Living Room</h2>
            <Link to="/shop" className="mt-2 inline-block border-b-2 text-sm md:text-base">Shop Now →</Link>
          </div>
        </div>

        <div className="w-full flex flex-col h-full gap-7">
          <div className="relative">
            <img
              src={banner_2}
              alt="Banner_2"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-15 left-8 lg:bottom-15 lg:left-15 text-black">
              <h2 className="text-xl md:text-4xl font-semibold">Bedroom</h2>
              <Link to="/shop" className="mt-2 inline-block border-b-2 text-sm md:text-base">Shop Now →</Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={banner_3}
              alt="Banner_3"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-15 left-8 lg:bottom-15 lg:left-15 text-black">
              <h2 className="text-xl md:text-4xl font-semibold">Kitchen</h2>
              <Link tp="/shop" className="mt-2 inline-block border-b-2 text-sm md:text-base">Shop Now →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerGrid;
