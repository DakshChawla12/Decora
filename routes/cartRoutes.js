const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartControllers");

// Add product to cart
router.post("/add", cartController.addToCart);

// Get all cart items for a customer
router.get("/:customerId", cartController.getCartItems);

// Update cart item quantity
router.put("/:customerId/:productId", cartController.updateCartItem);

// Remove an item from the cart
router.delete("/:customerId/:productId", cartController.removeCartItem);

// Clear cart for a customer
router.delete("/clear/:customerId", cartController.clearCart);

module.exports = router;
