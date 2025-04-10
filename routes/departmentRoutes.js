const express = require('express');
const router = express.Router();
const {
    create,
    findAll,
    findOne,
    update,
    deleteDepartment
} = require('../controllers/departmentControllers');
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddlewares');

// All routes protected and admin-only
router.use(isAuthenticated, isAdmin);

router.route('/')
    .get(findAll)
    .post(create);

router.route('/:id')
    .get(findOne)
    .patch(update)
    .delete(deleteDepartment);

module.exports = router;
