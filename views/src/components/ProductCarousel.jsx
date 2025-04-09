import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import { Link } from "react-router-dom";
import rightArrow from "../assets/rightArrow.png";

import ProductCard from "./ProductCard";

const ProductCarousel = () => {

    const { products } = useContext(StoreContext);

    return (
        <div className="w-full px-4 md:px-16 lg:px-28 py-10">
            {/* Section Header */}
            <div className="flex justify-between items-center w-full px-4 md:px-8 py-16">
                <div>
                    <h1 className="text-2xl md:text-4xl">New Arrivals</h1>
                </div>

                <div className="flex items-center">
                    <Link
                        to="/products"
                        className="flex items-center md:text-lg font-medium underline transition text-gray-800"
                    >
                        More Products
                        <img src={rightArrow} alt="arrow" className="w-5 h-5 md:w-6 md:h-6 ml-1" />
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.slice(1, 5).map((product) => (
                    <ProductCard key={product.productId} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductCarousel;
