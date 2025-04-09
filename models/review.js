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
        references: { model: Customer, key: "id" }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Product, key: "productId" }
    },
    review: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: false
});

module.exports = Review;
