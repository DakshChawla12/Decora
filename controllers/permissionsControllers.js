const Permissions = require('../models/permissions');

// Create a new permission
exports.create = async (req, res) => {
    try {
        const permission = await Permissions.create({ PermissionsName: req.body.name });
        res.status(201).json({ success: true, permission });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all permissions
exports.findAll = async (req, res) => {
    try {
        const permissions = await Permissions.findAll();
        res.status(200).json({ success: true, permissions });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get a permission by ID
exports.findOne = async (req, res) => {
    try {
        const permission = await Permissions.findByPk(req.params.id);
        if (permission) {
            res.status(200).json({ success: true, permission });
        } else {
            res.status(404).json({ success: false, message: "Permission not found!" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update a permission by ID
exports.update = async (req, res) => {
    try {
        const [updated] = await Permissions.update(req.body, {
            where: { Permissionsid: req.params.id },
        });
        if (updated) {
            const updatedPermission = await Permissions.findByPk(req.params.id);
            res.status(200).json({ success: true, updatedPermission });
        } else {
            res.status(404).json({ success: false, message: "Permission not found!!!" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete a permission by ID
exports.deletePermissions = async (req, res) => {
    try {
        const deleted = await Permissions.destroy({
            where: { Permissionsid: req.params.id },
        });
        if (deleted) {
            res.status(204).json({ success: true, message: "Permission deleted" });
        } else {
            res.status(404).json({ success: false, message: "Permission not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
