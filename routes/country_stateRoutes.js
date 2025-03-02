const express = require('express');
const router = express.Router();
const { create, findAll, findOne, update, deleteCountry_State } = require('../controllers/country_stateControllers');

router.route('/')
.get(findAll)
.post(create);

router.route('/:countryid/:stateid')
.get(findOne)
.patch(update)
.delete(deleteCountry_State);

module.exports = router;