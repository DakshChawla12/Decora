const express = require('express');
const router = express.Router();
const { create, findAll, findOne, update, deleteState } = require('../controllers/stateControllers');

router.route('/')
.get(findAll)
.post(create);

router.route('/:id')
.get(findOne)
.patch(update)
.delete(deleteState);

module.exports = router;