const express = require('express');
const router = express.Router();

const {
    create,
    findAll,
    findOne,
    update,
    deleteReview,
    getReviewsByProduct
} = require('../controllers/reviewControllers');

const { isAuthenticated } = require('../middlewares/authMiddlewares');

// Get all reviews
router.get('/', findAll);

// Create a review (only for authenticated users)
router.post('/', isAuthenticated, create);

// Get all reviews for a specific product
router.get('/product/:productId', getReviewsByProduct);

// Get, update, delete a review by ID
router.route('/:id')
    .get(findOne)
    .patch(isAuthenticated, update)
    .delete(isAuthenticated, deleteReview);

module.exports = router;
