const Customer = require("../models/customer");
const User = require("../models/user");

// Create a new customer
exports.create = async (req, res) => {
    try {
        const customer = await Customer.create(req.body);
        res.status(201).json({ success: true, customer });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all customers (including user details)
exports.findAll = async (req, res) => {
    try {
        const customers = await Customer.findAll({
            include: [{ model: User, attributes: ["id", "name", "email"] }] // Include User info
        });
        res.status(200).json({ success: true, customers });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get a customer by ID
exports.findOne = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id, {
            include: [{ model: User, attributes: ["id", "name", "email"] }]
        });

        if (!customer) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }
        
        res.status(200).json({ success: true, customer });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update a customer by ID
exports.update = async (req, res) => {
    try {
        const [updated] = await Customer.update(req.body, { where: { id: req.params.id } }); // Fixed id

        if (updated === 0) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }

        const updatedCustomer = await Customer.findByPk(req.params.id, {
            include: [{ model: User, attributes: ["id", "name", "email"] }]
        });
        res.status(200).json({ success: true, updatedCustomer });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete a customer by ID
exports.deleteCustomer = async (req, res) => {
    try {
        const deleted = await Customer.destroy({ where: { id: req.params.id } }); // Fixed id

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }

        res.status(200).json({ success: true, message: "Customer deleted" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
