const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentControllers");

// Create a new payment
router.post("/", paymentController.createPayment);

// Get all payments
router.get("/", paymentController.getAllPayments);

// Get a payment by ID
router.get("/:id", paymentController.getPaymentById);

// Get all payments by order ID
router.get("/order/:orderId", paymentController.getPaymentsByOrder);

// Update a payment by ID
router.put("/:id", paymentController.updatePayment);

// Delete a payment by ID
router.delete("/:id", paymentController.deletePayment);

module.exports = router;
