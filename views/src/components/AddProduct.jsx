import React, { useState } from "react";

const AddProduct = ({ onAdd }) => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            id: Date.now(),
            title: name,
            image,
            price,
        };
        onAdd(newProduct);
        setName("");
        setImage("");
        setPrice("");
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto my-6">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
                Add New Product
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium text-gray-600 mb-1">Product Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-800"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-600 mb-1">Image URL</label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-800"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-600 mb-1">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-800"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-zinc-900 text-white px-6 py-2 rounded hover:bg-zinc-800 transition-all w-full"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
