const express = require('express');
const router = express.Router();
const { create, findAll, findOne, update, deleteCountry } = require('../controllers/countryControllers');

router.route('/')
.get(findAll)
.post(create);

router.route('/:id')
.get(findOne)
.patch(update)
.delete(deleteCountry);

module.exports = router;