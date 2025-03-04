const Department_designation = require('../models/department_design');

// Create a new department_design
exports.create = async (req, res) => {
    try {
        const department_design = await Department_designation.create({
            deptid: req.body.deptid,
            desigid: req.body.desigid
        });
        res.status(201).json({ success: true, department_design });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all department_designs records
exports.findAll = async (req, res) => {
    try {
        const department_designs = await Department_designation.findAll();
        res.status(200).json({ success: true, department_designs });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get a department_design by ID
exports.findOne = async (req, res) => {
    try {
        const { deptid, desigid } = req.params;
        const department_design = await Department_designation.findOne({
            where: { deptid, desigid }
        });

        if (department_design) {
            res.status(200).json({ success: true, department_design });
        } else {
            res.status(404).json({ success: false, message: "Department Designation not found!!!" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update a department_design by ID
exports.update = async (req, res) => {
    try {
        const { desigid, deptid } = req.params;
        const [updated] = await Department_designation.update(req.body, {
            where: { desigid, deptid }
        });

        if (updated) {
            const updatedDepartment_designation = await Department_designation.findOne({
                where: { desigid, deptid }
            });
            res.status(200).json({ success: true, updatedDepartment_designation });
        } else {
            res.status(404).json({ success: false, message: "Department Designation not found!!!" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete a department_design by ID
exports.deleteDepartment_design = async (req, res) => {
    try {
        const { deptid, desigid } = req.params;
        const deleted = await Department_designation.destroy({
            where: { deptid, desigid }
        });

        if (deleted) {
            res.status(204).json({ success: true, message: "Department Designation deleted" });
        } else {
            res.status(404).json({ success: false, message: "Department Designation not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
