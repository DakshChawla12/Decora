const Employee = require("../models/employee");

// Create a new employee
exports.create = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json({ success: true, employee });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all employees
exports.findAll = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.status(200).json({ success: true, employees });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get a employee by ID
exports.findOne = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (employee) {
            res.status(200).json({ success: true, employee });
        } else {
            res.status(404).json({ success: false, message: "Employee not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update a employee by ID
exports.update = async (req, res) => {
    try {
        const [updated] = await Employee.update(req.body, {
            where: { Empid: req.params.id }
        });
        if (updated) {
            const updatedEmployee = await Employee.findByPk(req.params.id);
            res.status(200).json({ success: true, updatedEmployee });
        } else {
            res.status(404).json({ success: false, message: "Employee not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete a employee by ID
exports.deleteEmployee = async (req, res) => {
    try {
        const deleted = await Employee.destroy({
            where: { Empid: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ success: true, message: "Employee deleted" });
        } else {
            res.status(404).json({ success: false, message: "Employee not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
