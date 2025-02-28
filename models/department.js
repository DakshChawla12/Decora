const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../config/database') // Ensure this path is correct

const Department = sequelize.define('Department', {
    deptid: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Corrected case
        autoIncrement: true, // Corrected case
        allowNull: false
    },
    dname: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Department;
