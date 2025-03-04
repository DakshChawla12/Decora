const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Region_Country = sequelize.define("Region_Country", {
    regionid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    countryid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
});
module.exports = Region_Country;
