const express = require('express');
const router = express.Router();
const { create, findAll, findOne, update, deleteBrand } = require('../controllers/brandControllers');

router.route('/')
.get(findAll)
.post(create);

router.route('/:id')
.get(findOne)
.patch(update)
.delete(deleteBrand);

module.exports = router;