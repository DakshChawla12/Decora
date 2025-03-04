const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Product = require("./product");

const Brand = sequelize.define("Brand", {
    brandid: {
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
});

Product.belongsTo(Brand);

module.exports = Brand;