import React from "react";

const designations = [
    { id: 1, title: "Interior Designer", department: "Design" },
    { id: 2, title: "Product Manager", department: "Product" },
    { id: 3, title: "Sales Executive", department: "Sales" },
    { id: 4, title: "Warehouse Manager", department: "Operations" },
];

const DesignationList = () => {
    return (
        <div className="p-6 w-full">
            <h2 className="text-3xl font-bold text-zinc-800 mb-6">🧾 Designation List</h2>
            <div className="overflow-x-auto bg-white rounded-xl shadow-md ring-1 ring-gray-200">
                <table className="min-w-full table-auto text-sm">
                    <thead className="bg-zinc-200 text-gray-700">
                        <tr>
                            <th className="py-4 px-6 text-left font-semibold">ID</th>
                            <th className="py-4 px-6 text-left font-semibold">Designation</th>
                            <th className="py-4 px-6 text-left font-semibold">Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {designations.map((d, i) => (
                            <tr
                                key={d.id}
                                className={`${
                                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                                } hover:bg-zinc-100 transition-colors`}
                            >
                                <td className="py-4 px-6">{d.id}</td>
                                <td className="py-4 px-6 font-medium text-zinc-800">{d.title}</td>
                                <td className="py-4 px-6 text-zinc-600">{d.department}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DesignationList;
