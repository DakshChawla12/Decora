const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistControllers");

// Add a book to the wishlist
router.post("/", wishlistController.addToWishlist);

// Get all wishlist items
router.get("/", wishlistController.getAllWishlistItems);

// Get wishlist items by customer ID
router.get("/customer/:customerId", wishlistController.getWishlistByCustomer);

// Remove a book from the wishlist
router.delete("/customer/:customerId/book/:bookId", wishlistController.removeFromWishlist);

module.exports = router;
