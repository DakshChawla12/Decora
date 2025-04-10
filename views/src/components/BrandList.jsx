import React from "react";

const brands = [
    { id: 1, name: "Ikea", country: "Sweden" },
    { id: 2, name: "West Elm", country: "USA" },
    { id: 3, name: "Urban Ladder", country: "India" },
    { id: 4, name: "Castlery", country: "Singapore" },
];

const BrandList = () => {
    return (
        <div className="p-6 w-full">
            <h2 className="text-3xl font-bold text-zinc-800 mb-6">🏷️ Brand List</h2>
            <div className="overflow-x-auto bg-white rounded-xl shadow-md ring-1 ring-gray-200">
                <table className="min-w-full table-auto text-sm">
                    <thead className="bg-zinc-200 text-gray-700">
                        <tr>
                            <th className="py-4 px-6 text-left font-semibold">ID</th>
                            <th className="py-4 px-6 text-left font-semibold">Brand Name</th>
                            <th className="py-4 px-6 text-left font-semibold">Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands.map((brand, index) => (
                            <tr
                                key={brand.id}
                                className={`${
                                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                } hover:bg-zinc-100 transition-colors`}
                            >
                                <td className="py-4 px-6">{brand.id}</td>
                                <td className="py-4 px-6 font-medium text-zinc-800">
                                    {brand.name}
                                </td>
                                <td className="py-4 px-6 text-zinc-600">{brand.country}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BrandList;
