import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from "../Context/StoreContext";

const DesignationList = () => {
    const {
        designations,
        getAllDesignations,
        createDesignation,
        deleteDesignation,
        updateDesignation,
    } = useContext(StoreContext);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [newDesignation, setNewDesignation] = useState("");

    useEffect(() => {
        getAllDesignations(); // Fetch data when component mounts
    }, []);

    const openPopup = (id, currentTitle) => {
        setEditId(id);
        setEditTitle(currentTitle);
        setIsPopupOpen(true);
    };

    const handleUpdate = () => {
        if (editId && editTitle.trim()) {
            updateDesignation(editId, editTitle.trim());
            setIsPopupOpen(false); // Close the popup
        }
    };

    const renderContent = () => {
        if (!designations) {
            return <div className="text-lg font-semibold text-red-500">Failed to fetch designations</div>;
        }

        if (designations.length === 0) {
            return <div className="text-lg font-medium text-gray-500">No designations available.</div>;
        }

        return (
            <>
                <div className="overflow-x-auto bg-white rounded-xl shadow-md ring-1 ring-gray-200">
                    <table className="min-w-full table-auto text-sm">
                        <thead className="bg-zinc-200 text-gray-700">
                            <tr>
                                <th className="py-4 px-6 text-left font-semibold">ID</th>
                                <th className="py-4 px-6 text-left font-semibold">Designation</th>
                                <th className="py-4 px-6 text-left font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {designations.map((d, i) => (
                                <tr
                                    key={d.id}
                                    className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-zinc-100 transition-colors`}
                                >
                                    <td className="py-4 px-6">{d.id}</td>
                                    <td className="py-4 px-6 font-medium text-zinc-800">{d.title}</td>
                                    <td className="py-4 px-6 flex gap-2">
                                        <button
                                            onClick={() => openPopup(d.id, d.title)}
                                            className="px-3 py-1 text-sm bg-yellow-400 rounded hover:bg-yellow-500"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => deleteDesignation(d.id)}
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

                <div className="mt-4 flex gap-2 items-center">
                    <input
                        type="text"
                        placeholder="New designation"
                        value={newDesignation}
                        onChange={(e) => setNewDesignation(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg w-72"
                    />
                    <button
                        onClick={() => {
                            if (newDesignation.trim()) {
                                createDesignation(newDesignation.trim());
                                setNewDesignation("");
                            }
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Add Designation
                    </button>
                </div>
            </>
        );
    };

    return (
        <div className="p-6 w-full">
            <h2 className="text-3xl font-bold text-zinc-800 mb-6">🧾 Designation List</h2>
            {renderContent()}

            {/* ✏️ Update Popup */}
            {isPopupOpen && (
                <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-80">
                        <h3 className="text-lg font-semibold mb-4">Update Designation</h3>
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full border px-3 py-1 mb-4"
                            placeholder="Enter new title"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsPopupOpen(false)}
                                className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
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

export default DesignationList;
