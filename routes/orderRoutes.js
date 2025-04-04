const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderControllers");

// Create a new order
router.post("/", orderController.createOrder);

// Get all orders
router.get("/", orderController.getAllOrders);

// Get an order by ID
router.get("/:id", orderController.getOrderById);

// Get all orders by customer ID
router.get("/customer/:customerId", orderController.getOrdersByCustomer);

// Update an order by ID
router.put("/:id", orderController.updateOrder);

// Delete an order by ID
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
