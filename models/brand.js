const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Brand = sequelize.define("Brand", {
    brandId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    brandName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    timestamps: false
});

module.exports = Brand;
