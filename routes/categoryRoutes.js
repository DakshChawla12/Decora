const express = require('express');
const router = express.Router();
const { create, findAll, findOne, update, deleteCategory } = require('../controllers/categoryControllers');
const { isAdmin, isAuthenticated } = require('../middlewares/authMiddlewares');

// Public route
router.route('/')
    .get(findAll);

// Protected routes (admin only)
router.route('/')
    .post(isAuthenticated, isAdmin, create);

router.route('/:id')
    .get(isAuthenticated, isAdmin, findOne)
    .patch(isAuthenticated, isAdmin, update)
    .delete(isAuthenticated, isAdmin, deleteCategory);

module.exports = router;
