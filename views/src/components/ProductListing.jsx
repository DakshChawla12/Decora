import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import ProductCard from "./ProductCard";

const ProductListing = () => {
    const {
        products,
        loadingProducts,
        productsError,
        filterPrice,
        setFilterPrice,
        fetchProducts,
        fetchAllProducts,
        handleAddToCart,
        handleNavigate
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


    if (loadingProducts) return <div>Loading products...</div>;
    if (productsError) return <div>{productsError}</div>;

    return (
        <div className="w-full px-4 md:px-16 lg:px-28 py-10">
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

            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.productId} product={product} />
                    ))}
                </div>
            ) : (
                <div className="w-full font-semibold text-2xl flex justify-center">No products</div>
            )}
        </div>
    );
};

export default ProductListing;
