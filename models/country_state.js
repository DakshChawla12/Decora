const { DataTypes } = require("sequelize");
const {sequelize} = require('../config/database');

const Country_State = sequelize.define('Country_State', {
    countryid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    stateid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    }
}, { timestamps: false });

module.exports = Country_State;