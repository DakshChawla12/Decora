const Designation = require('../models/designation');

// Create a new designation
exports.create = async (req, res) => {
    try {
        const designation = await Designation.create({ desigName: req.body.name });
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
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get a designation by ID
exports.findOne = async (req, res) => {
    try {
        const designation = await Designation.findByPk(req.params.id);
        if (designation) {
            res.status(200).json({ success: true, designation });
        } else {
            res.status(404).json({ success: false, message: 'Designation not found!!!' });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update a designation by ID
exports.update = async (req, res) => {
    try {
        const [updated] = await Designation.update(req.body, {
            where: { desigid: req.params.id }
        });
        if (updated) {
            const updatedDesignation = await Designation.findByPk(req.params.id);
            res.status(200).json({ success: true, updatedDesignation });
        } else {
            res.status(404).json({ success: false, message: 'Designation not found' });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};


// Delete a designation by ID
exports.deleteDesignation = async (req, res) => {
    try {
        const deleted = await Designation.destroy({
            where: { desigid: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ success: true, message: 'Designation deleted!!!' });
        } else {
            res.status(404).json({ success: false, message: 'Designation not found!!!' });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
