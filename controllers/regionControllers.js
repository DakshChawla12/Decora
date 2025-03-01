const Region = require("../models/region");

// Create a new region
exports.create = async (req, res) => {
    try {
        const region = await Region.create({ RegionName: req.body.name });
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
        if (region) {
            res.status(200).json({ success: true, region });
        } else {
            res.status(404).json({ success: false, message: "Region not found!" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update a region by ID
exports.update = async (req, res) => {
    try {
        const [updated] = await Region.update(req.body, {
            where: { regionid: req.params.id },
        });
        if (updated) {
            const updatedRegion = await Region.findByPk(req.params.id);
            res.status(200).json({ success: true, updatedRegion });
        } else {
            res.status(404).json({ success: false, message: "Region not found!!!" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete a region by ID
exports.deleteRegion = async (req, res) => {
    try {
        const deleted = await Region.destroy({
            where: { regionid: req.params.id },
        });
        if (deleted) {
            res.status(204).json({ success: true, message: "Region deleted" });
        } else {
            res.status(404).json({ success: false, message: "Region not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
