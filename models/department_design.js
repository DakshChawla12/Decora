const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Dept_Design = sequelize.define('Dept_Desig', {
            deptid: {
        type: DataTypes.INTEGER,
        allowNull:false
        
        
    },
    desigid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});
module.exports = Dept_Design;



