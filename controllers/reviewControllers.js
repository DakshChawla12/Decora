const Review = require("../models/review");

// Create a new review
exports.create = async (req, res) => {
    try {
        const { customerId, productId, rating, review } = req.body; // Explicitly extract fields

        // Validate required fields
        if (!customerId || !productId || !rating) {
            return res.status(400).json({ success: false, message: "Missing required fields." });
        }

        const newReview = await Review.create({ customerId, productId, rating, review });
        res.status(201).json({ success: true, review: newReview });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all reviews
exports.findAll = async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.status(200).json({ success: true, reviews });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get a review by ID
exports.findOne = async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (!review) {
            return res.status(404).json({ success: false, message: "Review not found!" });
        }
        res.status(200).json({ success: true, review });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update a review by ID
exports.update = async (req, res) => {
    try {
        const [updated] = await Review.update(req.body, {
            where: { id: req.params.id }, // Fixed incorrect field name
        });

        if (updated === 0) {
            return res.status(404).json({ success: false, message: "Review not found!" });
        }

        const updatedReview = await Review.findByPk(req.params.id);
        res.status(200).json({ success: true, updatedReview });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete a review by ID
exports.deleteReview = async (req, res) => {
    try {
        const deleted = await Review.destroy({
            where: { id: req.params.id }, // Fixed incorrect field name
        });

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Review not found!" });
        }

        res.status(200).json({ success: true, message: "Review deleted successfully!" });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
