const Payment = require("../models/payment");

// Create a new payment
exports.createPayment = async (req, res) => {
    try {
        const payment = await Payment.create(req.body);
        res.status(201).json({ success: true, payment });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all payments
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll();
        res.status(200).json({ success: true, payments });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get a payment by ID
exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id);
        if (payment) {
            res.status(200).json({ success: true, payment });
        } else {
            res.status(404).json({ success: false, message: "Payment not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all payments by order ID
exports.getPaymentsByOrder = async (req, res) => {
    try {
        const payments = await Payment.findAll({ where: { orderId: req.params.orderId } });
        res.status(200).json({ success: true, payments });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update a payment by ID
exports.updatePayment = async (req, res) => {
    try {
        const [updated] = await Payment.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedPayment = await Payment.findByPk(req.params.id);
            res.status(200).json({ success: true, updatedPayment });
        } else {
            res.status(404).json({ success: false, message: "Payment not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete a payment by ID
exports.deletePayment = async (req, res) => {
    try {
        const deleted = await Payment.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(200).json({ success: true, message: "Payment deleted" });
        } else {
            res.status(404).json({ success: false, message: "Payment not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
