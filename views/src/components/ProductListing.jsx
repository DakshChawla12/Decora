import React, { useContext, useState, useMemo } from "react";
import { StoreContext } from "../Context/StoreContext";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";

const ProductListing = () => {
  const {
    products,
    loadingProducts,
    productsError,
    filterPrice,
    setFilterPrice,
    filterCategory,
    setFilterCategory,
    categories,
    fetchProducts,
    fetchAllProducts,
  } = useContext(StoreContext);

  const [searchTerm, setSearchTerm] = useState("");

  const handlePriceChange = (e) => {
    setFilterPrice(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleApplyFilter = () => {
    fetchProducts();
  };

  const handleResetFilter = () => {
    setFilterPrice("All Prices");
    setFilterCategory("All Categories");
    setSearchTerm("");
    fetchAllProducts();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter products locally based on search term (case insensitive)
  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  if (loadingProducts) return <div><LoadingSpinner /></div>;
  if (productsError) return <div>{productsError}</div>;

  return (
    <div className="w-full px-8 md:px-16 lg:px-38 py-10">
      {/* Filter Section */}

      <div className="mb-8 flex flex-wrap sm:items-center sm:justify-between gap-4">
        <div className="flex gap-4">
          {/* Filters div */}
          <div className="flex gap-4">
            <div className="mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="p-2 border-2 rounded-lg w-full max-w-sm"
              />
            </div>
            <div className="relative w-48">
              <select
                value={filterPrice}
                onChange={handlePriceChange}
                className="p-2 px-4 border-2 rounded-lg w-full appearance-none pr-8 cursor-pointer"
              >
                <option>All Prices</option>
                <option>Under $50</option>
                <option>$50 - $100</option>
                <option>Above $100</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
            </div>

            <div className="relative w-48">
              <select
                value={filterCategory}
                onChange={handleCategoryChange}
                className="p-2 px-4 border-2 rounded-lg w-full appearance-none pr-8 cursor-pointer"
              >
                <option>All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
            </div>
          </div>
        </div>

        {/* Buttons div */}
        <div className="flex gap-4">
          <button
            className="px-6 py-2 border-2 rounded-lg hover:bg-gray-100 cursor-pointer"
            onClick={handleApplyFilter}
          >
            Apply
          </button>

          <button
            className="px-6 py-2 border-2 rounded-lg hover:bg-red-400 cursor-pointer"
            onClick={handleResetFilter}
          >
            Reset
          </button>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-24">
          {filteredProducts.map((product) => (
            <div key={product.productId}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full font-semibold text-2xl flex justify-center">
          No products
        </div>
      )}
    </div>
  );
};

export default ProductListing;
