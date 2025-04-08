import React, { useContext, useEffect } from "react";
import { StoreContext } from "../Context/StoreContext";
import newIcon from '../assets/iconImages/newIcon.png';
import discountIcon from '../assets/iconImages/discountIcon.png';

const ProductListing = () => {
    const {
        products,
        loadingProducts,
        productsError,
        filterPrice,
        setFilterPrice,
        fetchProducts,
        fetchAllProducts,
        handleAddToCart
    } = useContext(StoreContext);

    const handlePriceChange = (e) => {
        setFilterPrice(e.target.value);
    };

    const handleApplyFilter = () => {
        fetchProducts();
    };

    const handleResetFilter = () => {
        setFilterPrice("All Prices");
        fetchAllProducts();
    };

    useEffect(() => {
        fetchAllProducts(); // Initial load with all products
    }, []);

    setTimeout(() => {
        console.log(products);
    }, 2000);

    if (loadingProducts) return <div>Loading products...</div>;
    if (productsError) return <div>{productsError}</div>;

    return (
        <div className="p-10">
            {/* Filter Section */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <select
                    value={filterPrice}
                    onChange={handlePriceChange}
                    className="p-2 border rounded w-48"
                >
                    <option>All Prices</option>
                    <option>Under $50</option>
                    <option>$50 - $100</option>
                    <option>Above $100</option>
                </select>

                <div className="flex gap-4">
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={handleApplyFilter}
                    >
                        Apply Filter
                    </button>

                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        onClick={handleResetFilter}
                    >
                        Reset Filter
                    </button>
                </div>
            </div>

            {products.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div
                        key={product.productId}
                        className="rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300"
                    >
                        <div className="relative group">
                            <img
                                src={product.images[0]}
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

                            <button
                                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-3 py-2 opacity-0 group-hover:opacity-100 rounded-sm transition-all duration-200"
                                onClick={() => handleAddToCart(product.productId)}
                            >
                                Add to Cart
                            </button>
                        </div>

                        <div className="p-4 flex flex-col items-start space-y-2">
                            <div className="flex text-yellow-400 text-sm">★★★★★</div>
                            <div className="font-medium text-gray-800">{product.title}</div>
                            <div className="text-sm text-gray-600">${product.price}</div>
                        </div>
                    </div>
                ))}
            </div> : <div className="w-[100%] font-semi-bold text-2xl flex justify-center">No products</div>}

        </div>
    );
};

export default ProductListing;
