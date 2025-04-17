import React, { useEffect, useContext } from "react";
import { StoreContext } from "../Context/StoreContext";

const OrderList = () => {
    const statusColors = {
        Delivered: "text-green-600",
        Pending: "text-yellow-600",
        Cancelled: "text-red-500",
        Shipped: "text-blue-600",
    };

    const {
        orders,
        getAllOrders,
        updateOrder,
    } = useContext(StoreContext);

    const statuses = ["Pending", "Shipped", "Delivered", "Cancelled"];

    useEffect(() => {
        getAllOrders();
    }, []);

    const handleStatusChange = (orderId, newStatus) => {
        updateOrder(orderId, newStatus);
    };

    return (
        <div className="p-6 w-full">

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-zinc-800">📋 Order List</h2>
            </div>

            <div className="overflow-x-auto bg-white rounded-xl shadow-md ring-1 ring-gray-200">
                <table className="min-w-full table-auto text-sm">
                    <thead className="bg-zinc-200 text-gray-700">
                        <tr>
                            <th className="py-4 px-6 text-left font-semibold">Order ID</th>
                            <th className="py-4 px-6 text-left font-semibold">Customer Email</th>
                            <th className="py-4 px-6 text-left font-semibold">Total Price</th>
                            <th className="py-4 px-6 text-left font-semibold">Status</th>
                            <th className="py-4 px-6 text-left font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, i) => (
                            <tr
                                key={order.id}
                                className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    } hover:bg-zinc-100 transition-colors`}
                            >
                                <td className="py-4 px-6">{order.id}</td>
                                <td className="py-4 px-6 text-zinc-800">
                                    {order.customer?.user?.email || "N/A"}
                                </td>
                                <td className="py-4 px-6 font-medium text-zinc-800">
                                    ₹{order.totalAmount.toFixed(2)}
                                </td>
                                <td className={`py-4 px-6 font-medium ${statusColors[order.status]}`}>
                                    {order.status}
                                </td>
                                <td className="py-4 px-6">
                                    <select
                                        className="border rounded px-2 py-1 text-sm"
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    >
                                        {statuses.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
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
