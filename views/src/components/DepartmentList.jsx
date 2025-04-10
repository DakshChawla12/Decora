import React, { useEffect, useContext, useState } from "react";
import { StoreContext } from "../Context/StoreContext";

const DepartmentList = () => {
    const {
        departments,
        getAllDepartments,
        createDepartment,
        deleteDepartment,
        updateDepartment,
    } = useContext(StoreContext);

    const [name, setName] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [editDeptId, setEditDeptId] = useState(null);
    const [editName, setEditName] = useState('');

    useEffect(() => {
        getAllDepartments();
    }, []);

    const handleAdd = () => {
        if (name.trim() !== '') {
            createDepartment(name);
            setName('');
        }
    };

    const openPopup = (id, currentName) => {
        setEditDeptId(id);
        setEditName(currentName);
        setIsPopupOpen(true);
    };

    const handleUpdate = () => {
        if (editName.trim() !== '') {
            updateDepartment(editDeptId, editName);
            setIsPopupOpen(false);
        }
    };

    return (
        <div className="p-6 w-full">
            <h2 className="text-3xl font-bold text-zinc-800 mb-6">🏢 Departments</h2>

            <div className="overflow-x-auto bg-white rounded-xl shadow-md ring-1 ring-gray-200">
                {departments.length > 0 ? (
                    <table className="min-w-full table-auto text-sm">
                        <thead className="bg-zinc-200 text-gray-700">
                            <tr>
                                <th className="py-4 px-6 text-left font-semibold">ID</th>
                                <th className="py-4 px-6 text-left font-semibold">Name</th>
                                <th className="py-4 px-6 text-left font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map((dept, i) => (
                                <tr
                                    key={dept.id}
                                    className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-zinc-100 transition-colors`}
                                >
                                    <td className="py-4 px-6">{dept.id}</td>
                                    <td className="py-4 px-6 font-medium text-zinc-800">{dept.name}</td>
                                    <td className="py-4 px-6 flex gap-2">
                                        <button
                                            onClick={() => openPopup(dept.id, dept.name)}
                                            className="px-3 py-1 text-sm bg-yellow-400 rounded hover:bg-yellow-500"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => deleteDepartment(dept.id)}
                                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="w-full text-2xl font-bold">Error fetching departments</div>
                )}
            </div>

            <div className="w-full flex gap-x-4 mt-4">
                <input
                    type="text"
                    placeholder="Department name"
                    className="border h-[2rem] px-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button
                    className="border px-4 bg-blue-500 text-white hover:bg-blue-600"
                    onClick={handleAdd}
                >
                    Add
                </button>
            </div>

            {/* ✅ Update Popup */}
            {isPopupOpen && (
                <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-sm">

                    <div className="bg-white rounded-lg p-6 shadow-lg w-80">
                        <h3 className="text-lg font-semibold mb-4">Update Department</h3>
                        <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full border px-3 py-1 mb-4"
                            placeholder="Enter new name"
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

export default DepartmentList;
