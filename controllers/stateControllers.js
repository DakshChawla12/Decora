const State = require("../models/state");

// Create a new state
exports.create = async (req, res) => {
    try {
        const state = await State.create({ name: req.body.name, regionId: req.body.regionId }); // Fix field name
        res.status(201).json({ success: true, state });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all states
exports.findAll = async (req, res) => {
    try {
        const states = await State.findAll();
        res.status(200).json({ success: true, states });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get a state by ID
exports.findOne = async (req, res) => {
    try {
        const state = await State.findByPk(req.params.id);
        if (state) {
            res.status(200).json({ success: true, state });
        } else {
            res.status(404).json({ success: false, message: "State not found!!!" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update a state by ID
exports.update = async (req, res) => {
    try {
        const [updated] = await State.update(req.body, {
            where: { id: req.params.id } // Fixed `where` clause
        });

        if (updated) {
            const updatedState = await State.findByPk(req.params.id);
            res.status(200).json({ success: true, updatedState });
        } else {
            res.status(404).json({ success: false, message: "State not found!!!" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete a state by ID
exports.deleteState = async (req, res) => {
    try {
        const deleted = await State.destroy({
            where: { id: req.params.id } // Fixed `where` clause
        });

        if (deleted) {
            res.status(200).json({ success: true, message: "State deleted" }); // Changed `204` to `200`
        } else {
            res.status(404).json({ success: false, message: "State not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
