const Customer = require("../models/customer");

// Create a new customer
exports.create = async (req, res) => {
    try {
        const customer = await Customer.create(req.body);
        res.status(201).json({ success: true, customer });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all customers
exports.findAll = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.status(200).json({ success: true, customers });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get a customer by ID
exports.findOne = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (customer) {
            res.status(200).json({ success: true, customer });
        } else {
            res.status(404).json({ success: false, message: "Customer not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update a customer by ID
exports.update = async (req, res) => {
    try {
        const [updated] = await Customer.update(req.body, {
            where: { customerid: req.params.id }
        });
        if (updated) {
            const updatedCustomer = await Customer.findByPk(req.params.id);
            res.status(200).json({ success: true, updatedCustomer });
        } else {
            res.status(404).json({ success: false, message: "Customer not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete a customer by ID
exports.deleteCustomer = async (req, res) => {
    try {
        const deleted = await Customer.destroy({
            where: { customerid: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ success: true, message: "Customer deleted" });
        } else {
            res.status(404).json({ success: false, message: "Customer not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
