const Role_Permissions = require("../models/role_permissions");

// Create a new role_permission
exports.create = async (req, res) => {
  try {
    const role_permission = await Role_Permissions.create({
      roleid: req.body.roleid,
      permissionsid: req.body.permissionsid
    });
    res.status(201).json({ success: true, role_permission });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all roles
exports.findAll = async (req, res) => {
  try {
    const roles = await Role_Permissions.findAll();
    res.status(200).json({ success: true, roles });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get a role_permission by ID
exports.findOne = async (req, res) => {
  try {
    const { roleid, permissionsid } = req.params;
    const role_permission = await Role_Permissions.findOne({
      where: { roleid, permissionsid }
    });

    if (role_permission) {
      res.status(200).json({ success: true, role_permission });
    } else {
      res.status(404).json({ success: false, message: "Role_permission not found!" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update a role_permission by ID
exports.update = async (req, res) => {
  try {
    const { roleid, permissionsid } = req.params;
    const [updated] = await Role_Permissions.update(req.body, {
      where: { roleid, permissionsid }
    });

    if (updated) {
      const updatedRolePermission = await Role_Permissions.findOne({
        where: { roleid, permissionsid }
      });
      res.status(200).json({ success: true, updatedRolePermission });
    } else {
      res.status(404).json({ success: false, message: "Role_permission not found!!!" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete a role_permission by ID
exports.deleteRole_Permission = async (req, res) => {
  try {
    const { roleid, permissionsid } = req.params;
    const deleted = await Role_Permissions.destroy({
      where: { roleid, permissionsid }
    });

    if (deleted) {
      res.status(204).json({ success: true, message: "Role_permission deleted" });
    } else {
      res.status(404).json({ success: false, message: "Role_permission not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
