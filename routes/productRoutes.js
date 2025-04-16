const express = require('express');
const router = express.Router();
const {
    create,
    findAll,
    findOne,
    update,
    deleteProduct,
    filter
} = require('../controllers/productControllers');

const upload = require('../config/multerConfig');

const {
    isAuthenticated,
    isAdmin
} = require('../middlewares/authMiddlewares');

// Public routes
router.get('/', findAll);
router.post('/filter', filter);

// Protected routes
router.post(
    '/',
    isAuthenticated,
    isAdmin,
    upload.array('images', 5), 
    create
);
router.get('/:id', findOne);
router.patch('/:id', isAuthenticated, isAdmin, update);
router.delete('/:id', isAuthenticated, isAdmin, deleteProduct);

module.exports = router;
