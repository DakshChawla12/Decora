const express = require('express');
const router = express.Router();
const { create, findAll, findOne, update, deleteCategory } = require('../controllers/categoryControllers');

router.route('/')
.get(findAll)
.post(create);

router.route('/:id')
.get(findOne)
.patch(update)
.delete(deleteCategory);

module.exports = router;