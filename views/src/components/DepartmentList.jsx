import React from "react";

const departments = [
    { id: 1, name: "Furniture", head: "Aarav Sharma", employees: 12 },
    { id: 2, name: "Lighting", head: "Neha Kapoor", employees: 8 },
    { id: 3, name: "Decor", head: "Karan Mehta", employees: 15 },
    { id: 4, name: "Rugs & Carpets", head: "Priya Verma", employees: 10 },
];

const DepartmentList = () => {
    return (
        <div className="p-6 w-full">
            <h2 className="text-3xl font-bold text-zinc-800 mb-6">🏢 Departments</h2>
            <div className="overflow-x-auto bg-white rounded-xl shadow-md ring-1 ring-gray-200">
                <table className="min-w-full table-auto text-sm">
                    <thead className="bg-zinc-200 text-gray-700">
                        <tr>
                            <th className="py-4 px-6 text-left font-semibold">ID</th>
                            <th className="py-4 px-6 text-left font-semibold">Name</th>
                            <th className="py-4 px-6 text-left font-semibold">Department Head</th>
                            <th className="py-4 px-6 text-left font-semibold">Employees</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map((dept, i) => (
                            <tr
                                key={dept.id}
                                className={`${
                                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                                } hover:bg-zinc-100 transition-colors`}
                            >
                                <td className="py-4 px-6">{dept.id}</td>
                                <td className="py-4 px-6 font-medium text-zinc-800">{dept.name}</td>
                                <td className="py-4 px-6">{dept.head}</td>
                                <td className="py-4 px-6">{dept.employees}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DepartmentList;
