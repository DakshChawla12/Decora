import React from "react";
import { Link } from "react-router-dom";
import rightArrow from "../assets/rightArrow.png";
import products from "../sample_data/products";
import newIcon from "../assets/iconImages/newIcon.png";
import discountIcon from "../assets/iconImages/discountIcon.png";

const ProductCarousel = () => {
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
                {products.slice(2, 6).map((product) => (
                    <div
                        key={product.id}
                        className="rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
                    >
                        <div className="relative group">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full object-cover"
                            />

                            <div className="absolute top-2 left-2 flex flex-col space-y-2">
                                {product.isNew && (
                                    <img src={newIcon} alt="New" className="w-16 h-6" />
                                )}
                                {product.isOnDiscount && (
                                    <img src={discountIcon} alt="Discount" className="w-16 h-6" />
                                )}
                            </div>

                            <button className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-[10px] sm:text-xs px-2 py-1 sm:px-3 sm:py-2 opacity-0 group-hover:opacity-100 rounded-sm transition-all duration-200 pointer">
                                Add to Cart
                            </button>
                        </div>

                        <div className="p-4 flex flex-col items-start space-y-2">
                            <div className="flex text-yellow-400 text-sm">★★★★★</div>
                            <div className="font-medium text-gray-800">{product.title}</div>
                            <div className="text-sm text-gray-600">{product.price}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCarousel;
