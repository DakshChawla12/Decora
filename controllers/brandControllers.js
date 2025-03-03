const Brand = require("../models/brand");

// Create a new brand
exports.create = async (req, res) => {
    try {
        const brand = await Brand.create({ brandName: req.body.name });
        res.status(201).json({ success: true, brand });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all brands
exports.findAll = async (req, res) => {
    try {
        const brands = await Brand.findAll();
        res.status(200).json({ success: true, brands });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get a brand by ID
exports.findOne = async (req, res) => {
    try {
        const brand = await Brand.findByPk(req.params.id);
        if (brand) {
            res.status(200).json({ success: true, brand });
        } else {
            res.status(404).json({ success: false, message: "Brand not found!!!" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update a brand by ID
exports.update = async (req, res) => {
    try {
        const [updated] = await Brand.update(req.body, {
            where: { brandid: req.params.id },
        });
        if (updated) {
            const updatedBrand = await Brand.findByPk(req.params.id);
            res.status(200).json({ success: true, updatedBrand });
        } else {
            res.status(404).json({ success: false, message: "Brand not found!!!" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete a brand by ID
exports.deleteBrand = async (req, res) => {
    try {
        const deleted = await Brand.destroy({
            where: { brandid: req.params.id },
        });
        if (deleted) {
            res.status(204).json({ success: true, message: "Brand deleted" });
        } else {
            res.status(404).json({ success: false, message: "Brand not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
