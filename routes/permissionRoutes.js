const express = require('express');
const router = express.Router();
const { create, findAll, findOne, update, deletePermissions } = require('../controllers/permissionsControllers');

router.route('/')
.get(findAll)
.post(create);

router.route('/:id')
.get(findOne)
.patch(update)
.delete(deletePermissions);

module.exports = router;