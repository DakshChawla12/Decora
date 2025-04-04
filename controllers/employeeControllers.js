const Employee = require("../models/employee");
const User = require("../models/user");
const Designation = require("../models/designation");
const Department = require("../models/department");

// Create a new employee
exports.create = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json({ success: true, employee });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all employees (with associations)
exports.findAll = async (req, res) => {
    try {
        const employees = await Employee.findAll({
            include: [
                { model: User, attributes: ["id", "name", "email"] },
                { model: Designation, attributes: ["id", "title"] },
                { model: Department, attributes: ["id", "name"] }
            ]
        });
        res.status(200).json({ success: true, employees });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get an employee by ID (with associations)
exports.findOne = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ["id", "name", "email"] },
                { model: Designation, attributes: ["id", "title"] },
                { model: Department, attributes: ["id", "name"] }
            ]
        });

        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found!" });
        }

        res.status(200).json({ success: true, employee });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update an employee by ID
exports.update = async (req, res) => {
    try {
        const [updated] = await Employee.update(req.body, {
            where: { id: req.params.id } // Fixed incorrect field name
        });

        if (updated === 0) {
            return res.status(404).json({ success: false, message: "Employee not found!" });
        }

        const updatedEmployee = await Employee.findByPk(req.params.id);
        res.status(200).json({ success: true, updatedEmployee });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete an employee by ID
exports.deleteEmployee = async (req, res) => {
    try {
        const deleted = await Employee.destroy({ where: { id: req.params.id } }); // Fixed incorrect field name

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Employee not found!" });
        }

        res.status(200).json({ success: true, message: "Employee deleted!" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
