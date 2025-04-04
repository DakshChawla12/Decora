const Wishlist = require("../models/wishlist");

// Add a book to the wishlist
exports.addToWishlist = async (req, res) => {
    try {
        const wishlistItem = await Wishlist.create(req.body);
        res.status(201).json({ success: true, wishlistItem });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all wishlist items
exports.getAllWishlistItems = async (req, res) => {
    try {
        const wishlist = await Wishlist.findAll();
        res.status(200).json({ success: true, wishlist });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get wishlist items by customer ID
exports.getWishlistByCustomer = async (req, res) => {
    try {
        const wishlist = await Wishlist.findAll({ where: { customerId: req.params.customerId } });
        res.status(200).json({ success: true, wishlist });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Remove a book from the wishlist
exports.removeFromWishlist = async (req, res) => {
    try {
        const deleted = await Wishlist.destroy({
            where: { customerId: req.params.customerId, bookId: req.params.bookId }
        });
        if (deleted) {
            res.status(200).json({ success: true, message: "Book removed from wishlist" });
        } else {
            res.status(404).json({ success: false, message: "Wishlist item not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
