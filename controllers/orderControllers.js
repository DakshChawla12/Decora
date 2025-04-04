const Order = require("../models/order");

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json({ success: true, order });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get an order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (order) {
            res.status(200).json({ success: true, order });
        } else {
            res.status(404).json({ success: false, message: "Order not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all orders by customer ID
exports.getOrdersByCustomer = async (req, res) => {
    try {
        const orders = await Order.findAll({ where: { customerId: req.params.customerId } });
        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update an order by ID
exports.updateOrder = async (req, res) => {
    try {
        const [updated] = await Order.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedOrder = await Order.findByPk(req.params.id);
            res.status(200).json({ success: true, updatedOrder });
        } else {
            res.status(404).json({ success: false, message: "Order not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
    try {
        const deleted = await Order.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(200).json({ success: true, message: "Order deleted" });
        } else {
            res.status(404).json({ success: false, message: "Order not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
