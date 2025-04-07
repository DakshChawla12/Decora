import React from "react";
import productPageImage from "../assets/productPageImage.png";

const ProductPageHeader = () => {
    return (
        <div className="w-[85%] mx-auto relative">
            <img
                src={productPageImage}
                alt="Product Header"
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 text-center px-4">
                <h1 className="text-4xl md:text-6xl">Shop Page</h1>
                <p className="text-md md:text-xl">Let's design the place you always imagined.</p>
            </div>
        </div>
    );
};

export default ProductPageHeader;