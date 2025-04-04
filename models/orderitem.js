const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/database");
const Order = require("./order");
const Product = require("./product");

const OrderItem = sequelize.define("OrderItem", {
  orderId: {
    type: DataTypes.INTEGER,
    references: { model: Order, key: "id" },
    allowNull: false
  },
  productId: {
    type: DataTypes.INTEGER,
    references: { model: Product, key: "productID" },
    allowNull: false
  },
  quantity: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: false });

module.exports = OrderItem;
