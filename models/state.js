const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const States = sequelize.define('State', {
            stateid: {
        type: DataTypes.INTEGER,
        primaryKey: true
        
    },
    stateName: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
module.exports = States;
