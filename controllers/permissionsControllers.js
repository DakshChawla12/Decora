const Permission = require('../models/permissions'); // Fixed incorrect import

// Create a new permission
exports.create = async (req, res) => {
    try {
        const permission = await Permission.create({ name: req.body.name }); // Fixed incorrect field name
        res.status(201).json({ success: true, permission });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all permissions
exports.findAll = async (req, res) => {
    try {
        const permissions = await Permission.findAll();
        res.status(200).json({ success: true, permissions });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get a permission by ID
exports.findOne = async (req, res) => {
    try {
        const permission = await Permission.findByPk(req.params.id);
        if (!permission) {
            return res.status(404).json({ success: false, message: "Permission not found!" });
        }
        res.status(200).json({ success: true, permission });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update a permission by ID
exports.update = async (req, res) => {
    try {
        const [updated] = await Permission.update(req.body, {
            where: { id: req.params.id } // Fixed incorrect field name
        });

        if (updated === 0) {
            return res.status(404).json({ success: false, message: "Permission not found!" });
        }

        const updatedPermission = await Permission.findByPk(req.params.id);
        res.status(200).json({ success: true, updatedPermission });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete a permission by ID
exports.deletePermissions = async (req, res) => {
    try {
        const deleted = await Permission.destroy({ where: { id: req.params.id } }); // Fixed incorrect field name

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Permission not found!" });
        }

        res.status(200).json({ success: true, message: "Permission deleted!" });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
