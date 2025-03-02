const Roles = require("../models/roles");

// Create a new role
exports.create = async (req, res) => {
  try {
    const role = await Roles.create({ roleName: req.body.name });
    res.status(201).json({ success: true, role });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all roles
exports.findAll = async (req, res) => {
  try {
    const roles = await Roles.findAll();
    res.status(200).json({ success: true, roles });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get a role by ID
exports.findOne = async (req, res) => {
  try {
    const role = await Roles.findByPk(req.params.id);
    if (role) {
      res.status(200).json({ success: true, role });
    } else {
      res.status(404).json({ success: false, message: "Role not found!" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update a role by ID
exports.update = async (req, res) => {
  try {
    const [updated] = await Roles.update(req.body, {
      where: { roleid: req.params.id },
    });
    if (updated) {
      const updatedRoles = await Roles.findByPk(req.params.id);
      res.status(200).json({ success: true, updatedRoles });
    } else {
      res.status(404).json({ success: false, message: "Role not found!!!" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete a role by ID
exports.deleteRoles = async (req, res) => {
  try {
    const deleted = await Roles.destroy({
      where: { roleid: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ success: true, message: "Role deleted" });
    } else {
      res.status(404).json({ success: false, message: "Role not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
