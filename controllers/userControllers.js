const User = require("../models/user");
const Role = require("../models/roles");

// Create a new user
exports.create = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ success: true, user });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all users with roles
exports.findAll = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{ model: Role, attributes: ["id", "name"] }]
        });
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get a user by ID
exports.findOne = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.id },
            include: [{ model: Role, attributes: ["id", "name"] }]
        });

        if (user) {
            res.status(200).json({ success: true, user });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update a user by ID
exports.update = async (req, res) => {
    try {
        const [updated] = await User.update(req.body, {
            where: { id: req.params.id } // Fixed `where` clause
        });

        if (updated) {
            const updatedUser = await User.findOne({
                where: { id: req.params.id },
                include: [{ model: Role, attributes: ["id", "name"] }]
            });
            res.status(200).json({ success: true, updatedUser });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const deleted = await User.destroy({
            where: { id: req.params.id } // Fixed `where` clause
        });

        if (deleted) {
            res.status(200).json({ success: true, message: "User deleted" }); // Changed `204` to `200`
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
