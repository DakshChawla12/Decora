const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Product = require('./product');

const Review = sequelize.define('Review',
    {
        reviewid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }, 
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    }
);
Product.hasMany(Review);
Review.belongsTo(Product);

module.exports = Review;