import React from "react";
import products from "../assets/products.js";
import newIcon from "../assets/newIcon.png";
import discountIcon from "../assets/discountIcon.png";

const ProductListing = () => {
    return (
        <div className="w-full px-4 md:px-16 lg:px-28 py-20">
            <div className="w-full flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
                <div className="flex flex-col sm:flex-row gap-6">
                    <div>
                        <p className="text-sm text-gray-500 mb-2">FILTER BY</p>
                        <h2 className="font-semibold mb-1">Category</h2>
                        <select className="border border-gray-300 px-4 py-2 rounded-md w-full sm:w-48">
                            <option>All Categories</option>
                            <option>Furniture</option>
                            <option>Lighting</option>
                            <option>Decor</option>
                        </select>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 mb-2">FILTER BY</p>
                        <h2 className="font-semibold mb-1">Price</h2>
                        <select className="border border-gray-300 px-4 py-2 rounded-md w-full sm:w-48">
                            <option>All Prices</option>
                            <option>Under $50</option>
                            <option>$50 - $100</option>
                            <option>Above $100</option>
                        </select>
                    </div>
                </div>

                <div className="w-full md:w-auto">
                    <p className="text-sm text-gray-500 mb-2">SORT BY</p>
                    <select className="border border-gray-300 px-4 py-2 rounded-md w-full sm:w-48">
                        <option>Sort by: Default</option>
                        <option>Price (Low to High)</option>
                        <option>Price (High to Low)</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300"
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

                            <button className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-3 py-2 opacity-0 group-hover:opacity-100 rounded-sm transition-all duration-200">
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

            <div className="flex justify-center mt-12">
                <button className="px-6 py-2 rounded-full border hover:bg-black hover:text-white transition duration-200">
                    Show More
                </button>
            </div>
        </div>
    );
};

export default ProductListing;