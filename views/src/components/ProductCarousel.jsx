import React, { useContext } from "react";
import { Link } from "react-router-dom";
import rightArrow from "../assets/rightArrow.png";
import ProductCard from "./ProductCard";
import { StoreContext } from "../Context/StoreContext";

const ProductCarousel = () => {

  const{ products } = useContext(StoreContext);

  return (
    <div className="h-[42.5rem] w-full px-8 py-8 md:px-16 lg:px-38 overflow-hidden">
      <div className="flex flex-col h-full w-full justify-between">
        {/* Heading */}
        <div>
          <h1 className="text-[2.125rem] w-32 font-semibold md:text-4xl leading-tight">
            New Arrivals
          </h1>
        </div>

        {/* Horizontal scrollable product cards */}
        <div className=" overflow-x-auto scrollbar-hidden">
          <div className="flex h-[24.5rem] gap-8 min-w-max">
            {products.slice(0, 7).map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        </div>

        {/* Hide scrollbar for WebKit browsers */}
        <style>
            {`
              div::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>

        {/* Link */}
        <div className="flex items-center">
          <Link
            to="/products"
            className="flex items-center md:text-lg font-medium border-b-2 transition text-gray-800"
          >
            More Products
            <img
              src={rightArrow}
              alt="arrow"
              className="w-5 h-5 md:w-6 md:h-6 ml-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
