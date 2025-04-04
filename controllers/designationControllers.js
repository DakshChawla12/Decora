const Designation = require("../models/designation");

// Create a new designation
exports.create = async (req, res) => {
    try {
        const designation = await Designation.create({ title: req.body.title }); // Fixed field name
        res.status(201).json({ success: true, designation });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all designations
exports.findAll = async (req, res) => {
    try {
        const designations = await Designation.findAll();
        res.status(200).json({ success: true, designations });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get a designation by ID
exports.findOne = async (req, res) => {
    try {
        const designation = await Designation.findByPk(req.params.id);

        if (!designation) {
            return res.status(404).json({ success: false, message: "Designation not found!" });
        }

        res.status(200).json({ success: true, designation });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update a designation by ID
exports.update = async (req, res) => {
    try {
        const [updated] = await Designation.update(
            { title: req.body.title },  // Fixed field name
            { where: { id: req.params.id } } // Fixed incorrect field name
        );

        if (updated === 0) {
            return res.status(404).json({ success: false, message: "Designation not found!" });
        }

        const updatedDesignation = await Designation.findByPk(req.params.id);
        res.status(200).json({ success: true, updatedDesignation });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete a designation by ID
exports.deleteDesignation = async (req, res) => {
    try {
        const deleted = await Designation.destroy({ where: { id: req.params.id } }); // Fixed incorrect field name

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Designation not found!" });
        }

        res.status(200).json({ success: true, message: "Designation deleted!" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
