import React from "react";

import leftImg from "../assets/productImages/product2.png";
import rightTopImg from "../assets/landingPageImages/bannerGrid1.png";
import rightBottomImg from "../assets/landingPageImages/bannerGrid2.png";

const BannerGrid = () => {
    return (
        <div className="w-full px-4 md:px-16 lg:px-28 py-10 hidden md:block">
            <div className="flex flex-col md:flex-row gap-4 h-[500px] max-w-5xl mx-auto">
                <div className="w-full md:w-1/2 h-full">
                    <img
                        src={leftImg}
                        alt="Left Banner"
                        className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                </div>

                <div className="w-full md:w-1/2 flex flex-col h-full gap-4">
                    <div className="h-1/2">
                        <img
                            src={rightTopImg}
                            alt="Top Right"
                            className="w-full h-full object-cover rounded-lg shadow-md"
                        />
                    </div>
                    <div className="h-1/2">
                        <img
                            src={rightBottomImg}
                            alt="Bottom Right"
                            className="w-full h-full object-cover rounded-lg shadow-md"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerGrid;
