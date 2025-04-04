const Region = require("../models/region");

// Create a new region
exports.create = async (req, res) => {
    try {
        const region = await Region.create({
            name: req.body.name,
            countryId: req.body.countryId // Ensure foreign key is included
        });
        res.status(201).json({ success: true, region });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all regions
exports.findAll = async (req, res) => {
    try {
        const regions = await Region.findAll();
        res.status(200).json({ success: true, regions });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get a region by ID
exports.findOne = async (req, res) => {
    try {
        const region = await Region.findByPk(req.params.id);
        if (!region) {
            return res.status(404).json({ success: false, message: "Region not found!" });
        }
        res.status(200).json({ success: true, region });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update a region by ID
exports.update = async (req, res) => {
    try {
        const [updated] = await Region.update(req.body, {
            where: { id: req.params.id }, // Fixed incorrect field name
        });

        if (updated === 0) {
            return res.status(404).json({ success: false, message: "Region not found!!!" });
        }

        const updatedRegion = await Region.findByPk(req.params.id);
        res.status(200).json({ success: true, updatedRegion });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete a region by ID
exports.deleteRegion = async (req, res) => {
    try {
        const deleted = await Region.destroy({
            where: { id: req.params.id }, // Fixed incorrect field name
        });

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Region not found!" });
        }

        res.status(200).json({ success: true, message: "Region deleted successfully!" });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
