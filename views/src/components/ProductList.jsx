import React, { useState } from "react";
import productsData from "../sample_data/products";
import AddProduct from "./AddProduct";

const ProductList = () => {
    const [products, setProducts] = useState(productsData);
    const [showForm, setShowForm] = useState(false);

    const handleAddProduct = (product) => {
        setProducts((prev) => [...prev, product]);
        setShowForm(false); 
    };

    return (
        <div className="p-6 w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">Product List</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-zinc-900 text-white px-4 py-2 rounded hover:bg-zinc-800 transition-all"
                >
                    {showForm ? "Cancel" : "Add Product"}
                </button>
            </div>

            {showForm && <AddProduct onAdd={handleAddProduct} />}

            <div className="overflow-x-auto bg-white shadow rounded-lg mt-6">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="py-3 px-4 font-medium text-gray-600">ID</th>
                            <th className="py-3 px-4 font-medium text-gray-600">Image</th>
                            <th className="py-3 px-4 font-medium text-gray-600">Name</th>
                            <th className="py-3 px-4 font-medium text-gray-600">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border-t hover:bg-gray-50">
                                <td className="py-3 px-4">{product.id}</td>
                                <td className="py-3 px-4">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-14 h-14 object-cover rounded"
                                    />
                                </td>
                                <td className="py-3 px-4">{product.title}</td>
                                <td className="py-3 px-4">₹{product.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList;