import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../Context/StoreContext";

const CreateEmployeeForm = () => {
    const {
        employees,
        getAllEmployees,
        createEmployee,
        deleteEmployee,
        designations,
        departments,
        users,
        getAllUsers,
        getAllDesignations,
        getAllDepartments,
    } = useContext(StoreContext);

    const [userId, setUserId] = useState("");
    const [designationId, setDesignationId] = useState("");
    const [departmentId, setDepartmentId] = useState("");

    useEffect(() => {
        getAllEmployees();
        getAllUsers();
        getAllDesignations();
        getAllDepartments();
    }, []);

    console.log("Users:", users);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userId && designationId && departmentId) {
            createEmployee({ userId, designationId, departmentId });
            setUserId("");
            setDesignationId("");
            setDepartmentId("");
        }
    };

    return (
        <div className="p-6 w-full">
            <h2 className="text-3xl font-bold text-zinc-800 mb-6">➕ Add New Employee</h2>

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl shadow-md ring-1 ring-gray-200 p-6 max-w-xl space-y-4 mb-10"
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">User</label>
                    <select
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    >
                        <option value="">Select User</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                    <select
                        value={designationId}
                        onChange={(e) => setDesignationId(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    >
                        <option value="">Select Designation</option>
                        {designations.map((d) => (
                            <option key={d.id} value={d.id}>
                                {d.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <select
                        value={departmentId}
                        onChange={(e) => setDepartmentId(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                                {dept.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Create Employee
                </button>
            </form>

            {/* ✅ Employees Table */}
            <h2 className="text-2xl font-semibold text-zinc-800 mb-4">👥 Employee List</h2>
            <div className="overflow-x-auto bg-white rounded-xl shadow-md ring-1 ring-gray-200">
                {employees.length > 0 ? (
                    <table className="min-w-full table-auto text-sm">
                        <thead className="bg-zinc-200 text-gray-700">
                            <tr>
                                <th className="py-4 px-6 text-left font-semibold">ID</th>
                                <th className="py-4 px-6 text-left font-semibold">User</th>
                                <th className="py-4 px-6 text-left font-semibold">Designation</th>
                                <th className="py-4 px-6 text-left font-semibold">Department</th>
                                <th className="py-4 px-6 text-left font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((emp, i) => (
                                <tr
                                    key={emp.id}
                                    className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-zinc-100 transition-colors`}
                                >
                                    <td className="py-4 px-6">{emp.id}</td>
                                    <td className="py-4 px-6 font-medium text-zinc-800">{emp.user?.name}</td>
                                    <td className="py-4 px-6 text-zinc-600">{emp.designation?.title}</td>
                                    <td className="py-4 px-6 text-zinc-600">{emp.department?.name}</td>
                                    <td className="py-4 px-6">
                                        <button
                                            onClick={() => deleteEmployee(emp.id)}
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
                    <div className="w-full text-lg font-semibold p-4">No employees found.</div>
                )}
            </div>
        </div>
    );
};

export default CreateEmployeeForm;
