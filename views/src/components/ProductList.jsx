import React, { useState, useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import AddProduct from "./AddProduct";
import LoadingSpinner from './LoadingSpinner';

const ProductList = () => {
    const { products, handleDelete, handleUpdate, handleAddProduct, loadingProducts } = useContext(StoreContext);

    const [showForm, setShowForm] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    if (loadingProducts) {
        return <div>
            <LoadingSpinner />
        </div>
    }

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
                            <th className="py-3 px-4 font-medium text-gray-600">Stock</th>
                            <th className="py-3 px-4 font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.productId} className="border-t hover:bg-gray-50">
                                <td className="py-3 px-4">{product.productId}</td>
                                <td className="py-3 px-4">
                                    {product.images && product.images.length > 0 ? (
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="w-14 h-14 object-cover rounded"
                                        />
                                    ) : (
                                        <span className="text-gray-400 italic">No Image</span>
                                    )}
                                </td>
                                <td className="py-3 px-4">{product.name}</td>
                                <td className="py-3 px-4">${product.price}</td>
                                <td className="py-3 px-4">{product.stock}</td>
                                <td className="py-3 px-4 space-x-2">
                                    <button
                                        onClick={() => {
                                            setEditingProduct(product);
                                            setEditPopup(true);
                                        }}
                                        className="px-3 py-1 text-sm bg-yellow-400 rounded hover:bg-yellow-500"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.productId)}
                                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Product Popup */}
            {editPopup && editingProduct && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded shadow-md w-96 space-y-4">
                        <h3 className="text-xl font-semibold">Edit Product</h3>

                        <input
                            type="text"
                            value={editingProduct.name}
                            onChange={(e) =>
                                setEditingProduct({ ...editingProduct, name: e.target.value })
                            }
                            className="w-full border px-3 py-2 rounded"
                            placeholder="Product Name"
                        />

                        <input
                            type="number"
                            value={editingProduct.price}
                            onChange={(e) =>
                                setEditingProduct({
                                    ...editingProduct,
                                    price: Number(e.target.value),
                                })
                            }
                            className="w-full border px-3 py-2 rounded"
                            placeholder="Product Price"
                        />

                        <input
                            type="number"
                            value={editingProduct.stock}
                            onChange={(e) =>
                                setEditingProduct({
                                    ...editingProduct,
                                    stock: Number(e.target.value),
                                })
                            }
                            className="w-full border px-3 py-2 rounded"
                            placeholder="Stock"
                        />

                        <textarea
                            value={editingProduct.description}
                            onChange={(e) =>
                                setEditingProduct({ ...editingProduct, description: e.target.value })
                            }
                            className="w-full border px-3 py-2 rounded"
                            placeholder="Description"
                            rows={3}
                        />

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setEditPopup(false)}
                                className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    setEditPopup(false);
                                    const updated = await handleUpdate(editingProduct.productId, {
                                        name: editingProduct.name,
                                        price: editingProduct.price,
                                        stock: editingProduct.stock,
                                        description: editingProduct.description,
                                    });
                                }}
                                className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-500"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
