const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Role = require("./roles");
const Permission = require("./permissions");

const RolePermission = sequelize.define("RolePermission", {
  roleId: {
    type: DataTypes.INTEGER,
    references: { model: Role, key: "id" },
    allowNull: false
  },
  permissionId: {
    type: DataTypes.INTEGER,
    references: { model: Permission, key: "id" },
    allowNull: false
  }
}, { 
  timestamps: false,
  tableName: "RolePermissions" // Ensures consistent table name
});

module.exports = RolePermission;
