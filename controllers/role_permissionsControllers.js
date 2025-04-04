const RolePermission = require("../models/role_permissions");

// Create a new role-permission
exports.create = async (req, res) => {
  try {
    const rolePermission = await RolePermission.create({
      roleId: req.body.roleId, // Ensure correct naming
      permissionId: req.body.permissionId
    });
    res.status(201).json({ success: true, rolePermission });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all role-permission mappings
exports.findAll = async (req, res) => {
  try {
    const rolePermissions = await RolePermission.findAll();
    res.status(200).json({ success: true, rolePermissions });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get a role-permission by roleId and permissionId
exports.findOne = async (req, res) => {
  try {
    const { roleId, permissionId } = req.params;
    const rolePermission = await RolePermission.findOne({
      where: { roleId, permissionId }
    });

    if (rolePermission) {
      res.status(200).json({ success: true, rolePermission });
    } else {
      res.status(404).json({ success: false, message: "Role-permission not found!" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update a role-permission by roleId and permissionId
exports.update = async (req, res) => {
  try {
    const { roleId, permissionId } = req.params;
    const [updated] = await RolePermission.update(req.body, {
      where: { roleId, permissionId }
    });

    if (updated) {
      const updatedRolePermission = await RolePermission.findOne({
        where: { roleId, permissionId }
      });
      res.status(200).json({ success: true, updatedRolePermission });
    } else {
      res.status(404).json({ success: false, message: "Role-permission not found!!!" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete a role-permission by roleId and permissionId
exports.deleteRolePermission = async (req, res) => {
  try {
    const { roleId, permissionId } = req.params;
    const deleted = await RolePermission.destroy({
      where: { roleId, permissionId }
    });

    if (deleted) {
      res.status(200).json({ success: true, message: "Role-permission deleted" });
    } else {
      res.status(404).json({ success: false, message: "Role-permission not found" });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
