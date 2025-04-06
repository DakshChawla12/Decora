const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
    productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: { min: 0 }
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    total_reviews: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    brandId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    images: {
        type: DataTypes.JSON,
        allowNull: false
        // validation removed
    }
}, {
    timestamps: true
});

module.exports = Product;
