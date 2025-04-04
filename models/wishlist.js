const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/database");
const Customer = require("./customer");
const Product = require("./product");

const Wishlist = sequelize.define("Wishlist", {
  customerId: {
    type: DataTypes.INTEGER,
    references: { model: Customer, key: "userId" },
    allowNull: false
  },
  productId: {
    type: DataTypes.INTEGER,
    references: { model: Product, key: "productId" },
    allowNull: false
  }
}, { timestamps: false });

module.exports = Wishlist;
