const Department = require('../models/department');

// Create a new department
exports.create = async (req, res) => {
    try {
        const department = await Department.create({ dname: req.body.dname });
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
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get a department by ID
exports.findOne = async (req, res) => {
    try {
        const department = await Department.findByPk(req.params.id);
        if (department) {
            res.status(200).json({ success: true, department });
        } else {
            res.status(404).json({ success: false, message: 'Department not found' });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update a department by ID
exports.update = async (req, res) => {
    try {
        const [updated] = await Department.update(req.body, {
            where: { deptid: req.params.id }
        });
        if (updated) {
            const updatedDepartment = await Department.findByPk(req.params.id);
            res.status(200).json({ success: true, updatedDepartment });
        } else {
            res.status(404).json({ success: false, message: 'Department not found' });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete a department by ID
exports.deleteDepartment = async (req, res) => {
    try {
        const deleted = await Department.destroy({
            where: { deptid: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ success: true, message: 'Department deleted' });
        } else {
            res.status(404).json({ success: false, message: 'Department not found' });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
