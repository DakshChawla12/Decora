const express = require('express');
const router = express.Router();
const {create , findAll , findOne , update , deleteRolePermission} = require('../controllers/role_permissionsControllers');

router.route('/')
.get(findAll)
.post(create);

router.route('/:roleid/:permissionsid')
.get(findOne)
.patch(update)
.delete(deleteRolePermission);

module.exports = router;