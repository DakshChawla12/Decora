import React from "react";

const orders = [
    { id: 101, customer: "Meera Joshi", date: "2025-04-05", amount: "₹5,499", status: "Delivered" },
    { id: 102, customer: "Arjun Rao", date: "2025-04-04", amount: "₹2,750", status: "Pending" },
    { id: 103, customer: "Ritika Sen", date: "2025-04-03", amount: "₹3,999", status: "Cancelled" },
    { id: 104, customer: "Varun Mehta", date: "2025-04-01", amount: "₹8,200", status: "Shipped" },
];

const statusColors = {
    Delivered: "text-green-600",
    Pending: "text-yellow-600",
    Cancelled: "text-red-500",
    Shipped: "text-blue-600",
};

const OrderList = () => {
    return (
        <div className="p-6 w-full">
            <h2 className="text-3xl font-bold text-zinc-800 mb-6">📋 Order List</h2>
            <div className="overflow-x-auto bg-white rounded-xl shadow-md ring-1 ring-gray-200">
                <table className="min-w-full table-auto text-sm">
                    <thead className="bg-zinc-200 text-gray-700">
                        <tr>
                            <th className="py-4 px-6 text-left font-semibold">Order ID</th>
                            <th className="py-4 px-6 text-left font-semibold">Customer</th>
                            <th className="py-4 px-6 text-left font-semibold">Date</th>
                            <th className="py-4 px-6 text-left font-semibold">Amount</th>
                            <th className="py-4 px-6 text-left font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, i) => (
                            <tr
                                key={order.id}
                                className={`${
                                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                                } hover:bg-zinc-100 transition-colors`}
                            >
                                <td className="py-4 px-6">{order.id}</td>
                                <td className="py-4 px-6 font-medium text-zinc-800">
                                    {order.customer}
                                </td>
                                <td className="py-4 px-6 text-zinc-600">{order.date}</td>
                                <td className="py-4 px-6">{order.amount}</td>
                                <td
                                    className={`py-4 px-6 font-semibold ${
                                        statusColors[order.status]
                                    }`}
                                >
                                    {order.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;
