const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Roles = sequelize.define("Roles", {
  roleid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  roleName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = Roles;
