const express = require('express');
const router = express.Router();
const {
    create,
    findAll,
    findOne,
    update,
    deleteBrand,
} = require('../controllers/brandControllers');

const { isAuthenticated, isAdmin } = require('../middlewares/authMiddlewares');

// Public: Get all brands
router.get('/', findAll);

// Public: Get brand by ID
router.get('/:id', findOne);

// Protected: Admin only - Create a brand
router.post('/', isAuthenticated, isAdmin, create);

// Protected: Admin only - Update a brand
router.patch('/:id', isAuthenticated, isAdmin, update);

// Protected: Admin only - Delete a brand
router.delete('/:id', isAuthenticated, isAdmin, deleteBrand);

module.exports = router;
