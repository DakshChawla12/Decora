const express = require("express");
const router = express.Router();
const {
    create,
    findAll,
    findOne,
    update,
    deleteEmployee
} = require("../controllers/employeeControllers");

const { isAuthenticated, isAdmin } = require('../middlewares/authMiddlewares');

router.use(isAuthenticated, isAdmin);

router.route('/')
    .get(findAll)
    .post(create);

router.route('/:id')
    .get(findOne)
    .patch(update)
    .delete(deleteEmployee);

module.exports = router;
