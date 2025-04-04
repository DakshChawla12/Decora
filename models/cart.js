const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/database");
const Customer = require("./customer");
const Product = require("./product");

const Cart = sequelize.define("Cart", {
    customerId: {
        type: DataTypes.INTEGER,
        references: { model: Customer, key: "userId" },
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        references: { model: Product, key: "productID" }, 
        allowNull: false
    },
    quantity: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: false });

module.exports = Cart;
