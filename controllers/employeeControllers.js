const { Employee, User, Designation, Department } = require('../models/associations');

// Utility to get all employees with associations
const getAllEmployees = async () => {
    return await Employee.findAll({
        include: [
            { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
            { model: Designation, as: 'designation', attributes: ['id', 'title'] },
            { model: Department, as: 'department', attributes: ['id', 'name'] }
        ]
    });
};

// ✅ Create a new employee and return all employees
exports.create = async (req, res) => {
    try {
        const { userId, designationId, departmentId } = req.body;

        if (!userId || !designationId || !departmentId) {
            return res.status(400).json({ success: false, message: "Missing required fields." });
        }

        await Employee.create({ userId, designationId, departmentId });
        const employees = await getAllEmployees();

        res.status(201).json({ success: true, employees });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// ✅ Get all employees
exports.findAll = async (req, res) => {
    try {
        const employees = await getAllEmployees();
        res.status(200).json({ success: true, employees });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// ✅ Get one employee by ID
exports.findOne = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id, {
            include: [
                { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
                { model: Designation, as: 'designation', attributes: ['id', 'title'] },
                { model: Department, as: 'department', attributes: ['id', 'name'] }
            ]
        });

        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found." });
        }

        res.status(200).json({ success: true, employee });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// ✅ Update employee and return all employees
exports.update = async (req, res) => {
    try {
        const { userId, designationId, departmentId } = req.body;

        const [updated] = await Employee.update(
            { userId, designationId, departmentId },
            { where: { id: req.params.id } }
        );

        if (updated === 0) {
            return res.status(404).json({ success: false, message: "Employee not found." });
        }

        const employees = await getAllEmployees();
        res.status(200).json({ success: true, employees });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// ✅ Delete employee and return all employees
exports.deleteEmployee = async (req, res) => {
    try {
        const deleted = await Employee.destroy({ where: { id: req.params.id } });

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Employee not found." });
        }

        const employees = await getAllEmployees();
        res.status(200).json({ success: true, message: "Employee deleted.", employees });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
