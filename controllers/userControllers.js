const Users = require("../models/user");

// Create a new user
exports.create = async (req, res) => {
    try {
        const user = await Users.create(req.body);
        res.status(201).json({ success: true, user });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all users
exports.findAll = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get a user by ID
exports.findOne = async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.id);
        if (user) {
            res.status(200).json({ success: true, user });
        } else {
            res.status(404).json({ success: false, message: "Users not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update a user by ID
exports.update = async (req, res) => {
    try {
        const [updated] = await Users.update(req.body, {
            where: { userid: req.params.id },
        });
        if (updated) {
            const updatedUser = await Users.findByPk(req.params.id);
            res.status(200).json({ success: true, updatedUser });
        } else {
            res.status(404).json({ success: false, message: "Users not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const deleted = await Users.destroy({
            where: { userid: req.params.id },
        });
        if (deleted) {
            res.status(204).json({ success: true, message: "User deleted" });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
