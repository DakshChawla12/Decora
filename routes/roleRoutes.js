const express = require('express');
const router = express.Router();
const { create, findAll, findOne, update, deleteRoles } = require('../controllers/rolesControllers');

router.route('/')
.get(findAll)
.post(create);

router.route('/:id')
.get(findOne)
.patch(update)
.delete(deleteRoles);

module.exports = router;