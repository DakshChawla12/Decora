const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddlewares");
const { body, validationResult } = require("express-validator");


const validateUser = [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password too short"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const validatePasswordUpdate = [
    body("oldPassword")
        .notEmpty()
        .withMessage("Old password is required")
        .isLength({ min: 6 })
        .withMessage("Old password must be at least 6 characters"),
    body("newPassword")
        .notEmpty()
        .withMessage("New password is required")
        .isLength({ min: 6 })
        .withMessage("New password must be at least 6 characters"),
    body("repeatPassword")
        .notEmpty()
        .withMessage("Repeat password is required")
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) {
                throw new Error("Repeat password must match new password");
            }
            return true;
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

// Routes
router.post("/register", validateUser, userController.createUser);
router.post("/login", validateUser, userController.login);
router.post("/logout", isAuthenticated, userController.logout);

router.get("/", isAuthenticated, isAdmin, userController.getUsers);
router.get("/user-details", isAuthenticated, userController.getUser);

router.patch("/update", isAuthenticated, userController.updateUser);
router.patch("/update-password", isAuthenticated, validatePasswordUpdate, userController.updatePassword);

router.delete("/:id", isAuthenticated, userController.deleteUser);

module.exports = router;