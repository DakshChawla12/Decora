const express = require("express");
const router = express.Router();
const discountController = require("../controllers/discountControllers");

// Create a new discount code
router.post("/", discountController.createDiscount);

// Get all discount codes
router.get("/", discountController.getAllDiscounts);

// Get a discount by ID
router.get("/:id", discountController.getDiscountById);

// Update a discount by ID
router.put("/:id", discountController.updateDiscount);

// Delete a discount by ID
router.delete("/:id", discountController.deleteDiscount);

module.exports = router;
