const Department = require("../models/department");

// Create a new department
exports.create = async (req, res) => {
    try {
        const department = await Department.create({ name: req.body.name }); // Fixed field name
        res.status(201).json({ success: true, department });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all departments
exports.findAll = async (req, res) => {
    try {
        const departments = await Department.findAll();
        res.status(200).json({ success: true, departments });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get a department by ID
exports.findOne = async (req, res) => {
    try {
        const department = await Department.findByPk(req.params.id);

        if (!department) {
            return res.status(404).json({ success: false, message: "Department not found" });
        }

        res.status(200).json({ success: true, department });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update a department by ID
exports.update = async (req, res) => {
    try {
        const [updated] = await Department.update(
            { name: req.body.name },  // Fixed field name
            { where: { id: req.params.id } } // Fixed incorrect field name
        );

        if (updated === 0) {
            return res.status(404).json({ success: false, message: "Department not found" });
        }

        const updatedDepartment = await Department.findByPk(req.params.id);
        res.status(200).json({ success: true, updatedDepartment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete a department by ID
exports.deleteDepartment = async (req, res) => {
    try {
        const deleted = await Department.destroy({ where: { id: req.params.id } }); // Fixed incorrect field name

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Department not found" });
        }

        res.status(200).json({ success: true, message: "Department deleted" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
