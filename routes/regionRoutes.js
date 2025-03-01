const express = require('express');
const router = express.Router();
const { create, findAll, findOne, update, deleteRegion } = require('../controllers/regionControllers');

router.route('/')
.get(findAll)
.post(create);

router.route('/:id')
.get(findOne)
.patch(update)
.delete(deleteRegion);

module.exports = router;