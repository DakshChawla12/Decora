const express = require('express');
const router = express.Router();
const { create, findAll, findOne, update, deleteRegion_Country } = require('../controllers/region_countryControllers');

router.route('/')
.get(findAll)
.post(create);

router.route('/:countryid/:regionid')
.get(findOne)
.patch(update)
.delete(deleteRegion_Country);

module.exports = router;