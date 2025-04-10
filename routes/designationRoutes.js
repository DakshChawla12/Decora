const express = require('express');
const router = express.Router();
const { create, findAll, findOne, update, deleteDesignation } = require('../controllers/designationControllers');
const {isAdmin,isAuthenticated} = require('../middlewares/authMiddlewares');

router.use(isAuthenticated,isAdmin);

router.route('/')
    .get(findAll)
    .post(create);

router.route('/:id')
    .get(findOne)
    .patch(update)
    .delete(deleteDesignation);

module.exports = router;