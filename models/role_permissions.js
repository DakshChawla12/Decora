const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Role_Permissions = sequelize.define('Role_Permissions', {
  roleid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  permissionsid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  timestamps: false
});

module.exports = Role_Permissions;