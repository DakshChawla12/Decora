import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from "../Context/StoreContext";

const CategoryList = () => {
    const {
        categories,
        getAllCategories,
        createCategory,
        updateCategory,
        deleteCategory,
    } = useContext(StoreContext);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");
    const [newName, setNewName] = useState("");

    useEffect(() => {
        getAllCategories();
    }, []);

    const openPopup = (id, name) => {
        setEditId(id);
        setEditName(name);
        setIsPopupOpen(true);
    };

    const handleUpdate = async () => {
        if (editId && editName.trim()) {
            await updateCategory(editId, editName.trim());
            setIsPopupOpen(false);
        }
    };

    const handleAddCategory = async () => {
        if (newName.trim()) {
            await createCategory(newName.trim());
            setNewName("");
        }
    };

    const handleDelete = async (id) => {
        await deleteCategory(id);
    };

    return (
        <div className="p-6 w-full">
            <h2 className="text-3xl font-bold text-zinc-800 mb-6">📦 Category List</h2>

            {categories?.length > 0 ? (
                <div className="overflow-x-auto bg-white rounded-xl shadow-md ring-1 ring-gray-200">
                    <table className="min-w-full table-auto text-sm">
                        <thead className="bg-zinc-200 text-gray-700">
                            <tr>
                                <th className="py-4 px-6 text-left font-semibold">ID</th>
                                <th className="py-4 px-6 text-left font-semibold">Category</th>
                                <th className="py-4 px-6 text-left font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat, i) => (
                                <tr
                                    key={cat.id}
                                    className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-zinc-100 transition-colors`}
                                >
                                    <td className="py-4 px-6">{cat.id}</td>
                                    <td className="py-4 px-6 font-medium text-zinc-800">{cat.name}</td>
                                    <td className="py-4 px-6 flex gap-2">
                                        <button
                                            onClick={() => openPopup(cat.id, cat.name)}
                                            className="px-3 py-1 text-sm bg-yellow-400 rounded hover:bg-yellow-500"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cat.id)}
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
            ) : (
                <div className="text-lg font-medium text-gray-500">No categories available.</div>
            )}

            <div className="mt-4 flex flex-col md:flex-row gap-3 items-start md:items-center">
                <input
                    type="text"
                    placeholder="New category name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg w-72"
                />
                <button
                    onClick={handleAddCategory}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Add Category
                </button>
            </div>

            {isPopupOpen && (
                <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-96">
                        <h3 className="text-lg font-semibold mb-4">Update Category</h3>
                        <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full border px-3 py-2 mb-3"
                            placeholder="Enter new category name"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsPopupOpen(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
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

export default CategoryList;
