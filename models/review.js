const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Customer = require("./customer");
const Product = require("./product");

const Review = sequelize.define("Review", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Customer, key: "id" } // Ensure 'id' matches Customer model's primary key
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Product, key: "productId" } // Ensure 'id' matches Product model's primary key
    },
    rating: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        validate: { min: 1, max: 5 } // Ensure rating is between 1 and 5
    },
    review: { type: DataTypes.TEXT }
}, { timestamps: false });

module.exports = Review;
