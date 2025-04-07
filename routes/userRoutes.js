const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddlewares');
const { body, validationResult } = require('express-validator');


const validateUser = [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password too short'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Routes
router.post('/register', userController.createUser);
router.post('/login', validateUser, userController.login);
router.post('/logout', isAuthenticated, userController.logout);

router.get('/', isAuthenticated, isAdmin, userController.getUsers);
router.get('/:id', isAuthenticated, userController.getUser);
router.put('/:id', isAuthenticated, userController.updateUser);
router.delete('/:id', isAuthenticated, userController.deleteUser);

module.exports = router;
