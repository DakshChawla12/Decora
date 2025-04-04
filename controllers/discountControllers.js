const Discount = require("../models/discount");

// Create a new discount code
exports.createDiscount = async (req, res) => {
    try {
        const discount = await Discount.create(req.body);
        res.status(201).json({ success: true, discount });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all discount codes
exports.getAllDiscounts = async (req, res) => {
    try {
        const discounts = await Discount.findAll();
        res.status(200).json({ success: true, discounts });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get a discount by ID
exports.getDiscountById = async (req, res) => {
    try {
        const discount = await Discount.findByPk(req.params.id);
        if (discount) {
            res.status(200).json({ success: true, discount });
        } else {
            res.status(404).json({ success: false, message: "Discount not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update a discount by ID
exports.updateDiscount = async (req, res) => {
    try {
        const [updated] = await Discount.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedDiscount = await Discount.findByPk(req.params.id);
            res.status(200).json({ success: true, updatedDiscount });
        } else {
            res.status(404).json({ success: false, message: "Discount not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete a discount by ID
exports.deleteDiscount = async (req, res) => {
    try {
        const deleted = await Discount.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(204).json({ success: true, message: "Discount deleted" });
        } else {
            res.status(404).json({ success: false, message: "Discount not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};