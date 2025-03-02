const express = require('express');
const router = express.Router();
const { create, findAll, findOne, update, deleteDesignation } = require('../controllers/designationControllers');

router.route('/')
    .get(findAll)
    .post(create);

router.route('/:id')
    .get(findOne)
    .patch(update)
    .delete(deleteDesignation);

module.exports = router;