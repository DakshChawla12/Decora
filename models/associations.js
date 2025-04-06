const User = require('./user');
const Role = require('./roles');
const Permission = require("./permissions");
const RolePermission = require("./role_permissions");
const Employee = require("./employee");
const Designation = require("./designation");
const Department = require("./department");
const Product = require("./product");
const Category = require("./category");
const Brand = require("./brand");
const Customer = require("./customer");
const Order = require("./order");
const OrderItem = require("./orderitem");
const Payment = require("./payment");
const Wishlist = require("./wishlist");
const Cart = require("./cart");
const Discount = require("./discount");
const Review = require("./review");
const Subscription = require("./subscription");
const Notification = require("./notification");
const Country = require("./country");
const Region = require("./region");
const State = require("./state");

// Product & OrderItem Relationship
Product.hasMany(OrderItem, { foreignKey: "productId", as: "orderItems" });
OrderItem.belongsTo(Product, { foreignKey: "productId", as: "product" });

// Customer & User Relationship
Customer.belongsTo(User, { foreignKey: "userId", as: "user" });

// User & Employee Relationship
User.hasOne(Employee, { foreignKey: "userId", as: "employeeDetails" });
Employee.belongsTo(User, { foreignKey: "userId", as: "user" });

// Country, Region & State Relationship
Country.hasMany(Region, { foreignKey: "countryId", as: "regions" });
Region.belongsTo(Country, { foreignKey: "countryId", as: "country" });

Region.hasMany(State, { foreignKey: "regionId", as: "states" });
State.belongsTo(Region, { foreignKey: "regionId", as: "region" });

// Role & User Relationship
User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });
Role.hasMany(User, { foreignKey: 'roleId', as: 'users' });

// Role & Permission Relationship (Many-to-Many)
Role.belongsToMany(Permission, { through: RolePermission, foreignKey: "roleId", as: "permissions" });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: "permissionId", as: "roles" });

// Designation & Employee Relationship
Designation.hasMany(Employee, { foreignKey: "designationId", as: "employees" });
Employee.belongsTo(Designation, { foreignKey: "designationId", as: "designation" });

// Department & Employee Relationship
Department.hasMany(Employee, { foreignKey: "departmentId", as: "employees" });
Employee.belongsTo(Department, { foreignKey: "departmentId", as: "department" });

// Category & Product Relationship
Category.hasMany(Product, {
  foreignKey: "categoryId",
  as: "products",
  onDelete: "SET NULL",
  onUpdate: "CASCADE"
});
Product.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
  onDelete: "SET NULL",
  onUpdate: "CASCADE"
});

// Brand & Product Relationship
Brand.hasMany(Product, {
  foreignKey: "brandId",
  as: "products",
  onDelete: "SET NULL",
  onUpdate: "CASCADE"
});
Product.belongsTo(Brand, {
  foreignKey: "brandId",
  as: "brand",
  onDelete: "SET NULL",
  onUpdate: "CASCADE"
});

// Customer & Order Relationship
Customer.hasMany(Order, { foreignKey: "customerId", as: "orders" });
Order.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });

// Order & OrderItem Relationship
Order.hasMany(OrderItem, { foreignKey: "orderId", as: "orderItems" });
OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "order" });

// Order & Payment Relationship
Order.hasOne(Payment, { foreignKey: "orderId", as: "payment" });
Payment.belongsTo(Order, { foreignKey: "orderId", as: "order" });

// Customer & Wishlist Relationship
Customer.hasMany(Wishlist, { foreignKey: "customerId", as: "wishlists" });
Wishlist.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });

// Customer & Cart Relationship
Customer.hasMany(Cart, { foreignKey: "customerId", as: "carts" });
Cart.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });

// Product & Wishlist Relationship
Product.hasMany(Wishlist, { foreignKey: "productId", as: "wishlistItems" });
Wishlist.belongsTo(Product, { foreignKey: "productId", as: "product" });

// Product & Cart Relationship
Product.hasMany(Cart, { foreignKey: "productId", as: "carts" });
Cart.belongsTo(Product, { foreignKey: "productId", as: "product" });

// Discount & Order Relationship
Discount.hasMany(Order, { foreignKey: "discountId", as: "orders" });
Order.belongsTo(Discount, { foreignKey: "discountId", as: "discount" });

// Product & Review Relationship
Product.hasMany(Review, { foreignKey: "productId", as: "reviews" });
Review.belongsTo(Product, { foreignKey: "productId", as: "product" });

// Customer & Review Relationship
Customer.hasMany(Review, { foreignKey: "customerId", as: "reviews" });
Review.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });

// Customer & Subscription Relationship
Customer.hasMany(Subscription, { foreignKey: "customerId", as: "subscriptions" });
Subscription.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });

// User & Notification Relationship
User.hasMany(Notification, { foreignKey: "userId", as: "notifications" });
Notification.belongsTo(User, { foreignKey: "userId", as: "user" });

module.exports = {
  User,
  Role,
  Permission,
  RolePermission,
  Employee,
  Designation,
  Department,
  Product,
  Category,
  Brand,
  Customer,
  Order,
  OrderItem,
  Payment,
  Wishlist,
  Cart,
  Discount,
  Review,
  Subscription,
  Notification,
  Country,
  Region,
  State,
};
