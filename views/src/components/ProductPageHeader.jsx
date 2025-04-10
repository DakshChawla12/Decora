import React from "react";
import productPageImage from "../assets/productPageImage.png";

const ProductPageHeader = () => {
  return (
    <div className="relative lg:h-[23rem] w-full px-8 lg:px-38">
      <img
        src={productPageImage}
        alt="Product Header"
        className="w-full h-[19.25rem] lg:h-full object-cover"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 text-center px-8">
        <h1 className="text-4xl font-bold md:text-6xl">Shop Page</h1>
        <p className="text-md md:text-xl">
          Let's design the place you always imagined.
        </p>
      </div>
    </div>
  );
};

export default ProductPageHeader;
