const Review = require("../models/review");

// Create a new review
exports.create = async (req, res) => {
    try {
        const review = await Review.create(req.body);
        res.status(201).json({ success: true, review });
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
        if (review) {
            res.status(200).json({ success: true, review });
        } else {
            res.status(404).json({ success: false, message: "Review not found!" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update a review by ID
exports.update = async (req, res) => {
    try {
        const [updated] = await Review.update(req.body, {
            where: { reviewid: req.params.id },
        });
        if (updated) {
            const updatedReview = await Review.findByPk(req.params.id);
            res.status(200).json({ success: true, updatedReview });
        } else {
            res.status(404).json({ success: false, message: "Review not found!!!" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete a review by ID
exports.deleteReview = async (req, res) => {
    try {
        const deleted = await Review.destroy({
            where: { reviewid: req.params.id },
        });
        if (deleted) {
            res.status(204).json({ success: true, message: "Review deleted" });
        } else {
            res.status(404).json({ success: false, message: "Review not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
