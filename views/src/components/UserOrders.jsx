import React, { useContext, useEffect } from "react";
import { StoreContext } from "../Context/StoreContext";

const Orders = () => {
    const { getCustomerOrders, customerOrders } = useContext(StoreContext);

    useEffect(() => {
        getCustomerOrders();
    }, []);

    return (
        <div className="w-full flex flex-col gap-6">
            <h2 className="text-lg font-semibold">Order History</h2>

            {customerOrders.length === 0 ? (
                <p className="text-gray-600 text-sm">You have no orders yet.</p>
            ) : (
                <div className="flex flex-col rounded-xl overflow-hidden">
                    {/* Header Row */}
                    <div className="grid grid-cols-4 px-5 pb-4 text-sm font-semibold text-gray-700">
                        <span>Order ID</span>
                        <span>Date</span>
                        <span>Status</span>
                        <span>Total</span>
                    </div>

                    {/* Orders List */}
                    {customerOrders.map((order) => {
                        const orderDate =
                            order.orderItems?.[0]?.product?.createdAt || null;
                        const formattedDate = orderDate
                            ? new Date(orderDate).toLocaleDateString()
                            : "N/A";

                        return (
                            <div
                                key={order.id}
                                className="grid grid-cols-4 p-5 text-sm border-t border-gray-300 hover:bg-gray-50 transition"
                            >
                                <span>{order.id}</span>
                                <span>{formattedDate}</span>
                                <span>{order.status}</span>
                                <span>₹{order.totalAmount.toFixed(2)}</span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Orders;
