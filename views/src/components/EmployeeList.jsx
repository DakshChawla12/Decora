import React from "react";

const employees = [
    { id: 1, name: "Aanya Sharma", designation: "Interior Designer", department: "Design" },
    { id: 2, name: "Rahul Verma", designation: "Product Manager", department: "Product" },
    { id: 3, name: "Neha Kapoor", designation: "Sales Executive", department: "Sales" },
    { id: 4, name: "Karan Mehta", designation: "Warehouse Manager", department: "Operations" },
];

const EmployeeList = () => {
    return (
        <div className="p-6 w-full">
            <h2 className="text-3xl font-bold text-zinc-800 mb-6">👤 Employee List</h2>
            <div className="overflow-x-auto bg-white rounded-xl shadow-md ring-1 ring-gray-200">
                <table className="min-w-full table-auto text-sm">
                    <thead className="bg-zinc-200 text-gray-700">
                        <tr>
                            <th className="py-4 px-6 text-left font-semibold">ID</th>
                            <th className="py-4 px-6 text-left font-semibold">Name</th>
                            <th className="py-4 px-6 text-left font-semibold">Designation</th>
                            <th className="py-4 px-6 text-left font-semibold">Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((e, i) => (
                            <tr
                                key={e.id}
                                className={`${
                                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                                } hover:bg-zinc-100 transition-colors`}
                            >
                                <td className="py-4 px-6">{e.id}</td>
                                <td className="py-4 px-6 font-medium text-zinc-800">{e.name}</td>
                                <td className="py-4 px-6 text-zinc-600">{e.designation}</td>
                                <td className="py-4 px-6 text-zinc-600">{e.department}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;
