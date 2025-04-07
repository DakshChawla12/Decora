const express = require('express');
const router = express.Router();
const { create, findAll, findOne, update, deleteProduct, filter } = require('../controllers/productControllers');

router.route('/')
.get(findAll)
.post(create);

router.route('/filter').post(filter);

router.route('/:id')
.get(findOne)
.patch(update)
.delete(deleteProduct);

module.exports = router;