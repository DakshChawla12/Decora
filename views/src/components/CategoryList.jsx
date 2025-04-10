import React from "react";

const categories = [
    { id: 1, name: "Furniture", description: "Sofas, Beds, Tables, Chairs" },
    { id: 2, name: "Lighting", description: "Lamps, Chandeliers, Ceiling Lights" },
    { id: 3, name: "Wall Decor", description: "Paintings, Clocks, Mirrors" },
    { id: 4, name: "Rugs & Carpets", description: "Area rugs, runners, mats" },
];

const CategoryList = () => {
    return (
        <div className="p-6 w-full">
            <h2 className="text-3xl font-bold text-zinc-800 mb-6">📦 Category List</h2>
            <div className="overflow-x-auto bg-white rounded-xl shadow-md ring-1 ring-gray-200">
                <table className="min-w-full table-auto text-sm">
                    <thead className="bg-zinc-200 text-gray-700">
                        <tr>
                            <th className="py-4 px-6 text-left font-semibold">ID</th>
                            <th className="py-4 px-6 text-left font-semibold">Category</th>
                            <th className="py-4 px-6 text-left font-semibold">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr
                                key={category.id}
                                className={`${
                                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                } hover:bg-zinc-100 transition-colors`}
                            >
                                <td className="py-4 px-6">{category.id}</td>
                                <td className="py-4 px-6 font-medium text-zinc-800">
                                    {category.name}
                                </td>
                                <td className="py-4 px-6 text-zinc-600">{category.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryList;
