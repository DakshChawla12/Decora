const {Review , Customer, User} = require('../models/associations');

// Create a new review
exports.create = async (req, res) => {
    try {
        const customerId = req.user.id; // Authenticated user's ID
        const { productId, review } = req.body;

        if (!productId) {
            return res.status(400).json({ success: false, message: "Product ID is required." });
        }

        const newReview = await Review.create({ customerId, productId, review });
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

// Get all reviews for a specific product
exports.getReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await Review.findAll({
            where: { productId },
            include: [
                {
                    model: Customer,
                    as: "customer",
                    include: [
                        {
                            model: User,
                            as: "user",
                            attributes: ["name"], 
                        },
                    ],
                },
            ],
        });

        if (reviews.length === 0) {
            return res.status(404).json({ success: false, message: "No reviews found for this product." });
        }

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
            where: { id: req.params.id },
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
            where: { id: req.params.id },
        });

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Review not found!" });
        }

        res.status(200).json({ success: true, message: "Review deleted successfully!" });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
