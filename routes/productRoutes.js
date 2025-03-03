const express = require('express');
const router = express.Router();
const { create, findAll, findOne, update, deleteProduct } = require('../controllers/productControllers');

router.route('/')
.get(findAll)
.post(create);

router.route('/:id')
.get(findOne)
.patch(update)
.delete(deleteProduct);

module.exports = router;