const express = require('express');
const router = express.Router();
const { create, findAll, findOne, update, deleteRole_Permission } = require('../controllers/role_permissionsControllers');

router.route('/')
.get(findAll)
.post(create);

router.route('/:id')
.get(findOne)
.patch(update)
.delete(deleteRole_Permission);

module.exports = router;