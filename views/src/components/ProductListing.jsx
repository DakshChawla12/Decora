import React, { useContext, useEffect } from "react";
import { StoreContext } from "../Context/StoreContext";

const ProductListing = () => {
    const {
        products,
        loadingProducts,
        productsError,
        filterPrice,
        setFilterPrice,
        fetchProducts,
    } = useContext(StoreContext);

    const handlePriceChange = (e) => {
        setFilterPrice(e.target.value);
    };

    useEffect(() => {
        fetchProducts();
    }, [filterPrice]);

    if (loadingProducts) return <div>Loading products...</div>;
    if (productsError) return <div>{productsError}</div>;

    return (
        <div className="p-10">
            {/* Filter by Price only */}
            <div className="mb-8">
                <select value={filterPrice} onChange={handlePriceChange}>
                    <option>All Prices</option>
                    <option>Under $50</option>
                    <option>$50 - $100</option>
                    <option>Above $100</option>
                </select>
            </div>

            {/* Show 'No products' if empty */}
            {products.length === 0 ? (
                <div>No products found</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product.productId} className="border rounded-lg p-4">
                            <img
                                src={product.images?.[0] || "https://via.placeholder.com/300"}
                                alt={product.name}
                                className="h-48 w-full object-cover mb-4"
                            />
                            <div className="text-lg font-bold">{product.name}</div>
                            <div>${product.price.toFixed(2)}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductListing;
