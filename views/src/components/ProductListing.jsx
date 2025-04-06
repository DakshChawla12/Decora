import React, { useEffect, useState } from "react";
import axios from "axios";
import newIcon from "../assets/iconImages/newIcon.png";
import discountIcon from "../assets/iconImages/discountIcon.png";

const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // new state for error

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5001/api/product");
                setProducts(response.data.products);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to fetch products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="text-center py-20 text-lg">Loading products...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-600 text-lg">{error}</div>;
    }

    return (
        <div className="w-full px-4 md:px-16 lg:px-28 py-20">
            {/* Filters and sorting - unchanged */}
            <div className="w-full flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
                {/* ...filter UI remains same */}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div
                        key={product.productId}
                        className="rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300"
                    >
                        <div className="relative group">
                            <img
                                src={product.images?.[0] || "https://via.placeholder.com/300"}
                                alt={product.name}
                                className="w-full h-64 object-cover"
                            />

                            {/* Optional Tags */}
                            <div className="absolute top-2 left-2 flex flex-col space-y-2">
                                {product.stock > 0 && product.stock <= 5 && (
                                    <img src={newIcon} alt="Low Stock" className="w-16 h-6" />
                                )}
                                {product.price < 50 && (
                                    <img src={discountIcon} alt="Discount" className="w-16 h-6" />
                                )}
                            </div>

                            <button className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-3 py-2 opacity-0 group-hover:opacity-100 rounded-sm transition-all duration-200">
                                Add to Cart
                            </button>
                        </div>

                        <div className="p-4 flex flex-col items-start space-y-2">
                            <div className="flex text-yellow-400 text-sm">
                                {"★".repeat(Math.floor(product.rating || 0))}
                                {"☆".repeat(5 - Math.floor(product.rating || 0))}
                                <span className="ml-2 text-gray-500 text-xs">
                                    ({product.total_reviews})
                                </span>
                            </div>
                            <div className="font-medium text-gray-800">{product.name}</div>
                            <div className="text-sm text-gray-600">${product.price.toFixed(2)}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Show More Button */}
            <div className="flex justify-center mt-12">
                <button className="px-6 py-2 rounded-full border hover:bg-black hover:text-white transition duration-200">
                    Show More
                </button>
            </div>
        </div>
    );
};

export default ProductListing;
