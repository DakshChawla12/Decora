import React from "react";

const mockOrders = [
    {
        id: "ORD123456",
        date: "2025-04-01",
        status: "Delivered",
        total: "$125.50",
    },
    {
        id: "ORD789101",
        date: "2025-03-15",
        status: "Processing",
        total: "$58.00",
    },
];

const Orders = () => {
    return (
        <div className="w-full flex flex-col gap-6">
            <h2 className="text-lg font-semibold">Order History</h2>

            {mockOrders.length === 0 ? (
                <p className="text-gray-600 text-sm">You have no orders yet.</p>
            ) : (
                <div className="flex flex-col  rounded-xl overflow-hidden">
                    {/* Header Row */}
                    <div className="grid grid-cols-4 px-5 pb-4 text-sm font-semibold text-gray-700">
                        <span>Order ID</span>
                        <span>Date</span>
                        <span>Status</span>
                        <span>Total</span>
                    </div>

                    {/* Orders List */}
                    {mockOrders.map((order) => (
                        <div
                            key={order.id}
                            className="grid grid-cols-4 p-5 text-sm border-t border-gray-300 hover:bg-gray-50 transition"
                        >
                            <span>{order.id}</span>
                            <span>{order.date}</span>
                            <span>{order.status}</span>
                            <span>{order.total}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;