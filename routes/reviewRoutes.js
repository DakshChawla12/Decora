const express = require('express');
const router = express.Router();
const { create, findAll, findOne, update, deleteReview } = require('../controllers/reviewControllers');

router.route('/')
.get(findAll)
.post(create);

router.route('/:id')
.get(findOne)
.patch(update)
.delete(deleteReview);

module.exports = router;