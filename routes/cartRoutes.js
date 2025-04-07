const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartControllers");
const { isAdmin, isAuthenticated } = require('../middlewares/authMiddlewares');

// Add product to cart (protected)
router.post("/add", isAuthenticated, cartController.addToCart);

// Get all cart items for a customer (protected)
router.get("/", isAuthenticated, cartController.getCartItems);

// Update cart item quantity (protected)
router.put("/", isAuthenticated, cartController.updateCartItem);

// Remove an item from the cart (protected)
router.delete("/remove", isAuthenticated, cartController.removeCartItem);

// Clear cart for a customer (protected)
router.delete("/clear", isAuthenticated, cartController.clearCart);

module.exports = router;
