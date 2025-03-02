const express = require('express');
const router = express.Router();
const { create, findAll, findOne, update, deleteDepartment_design } = require('../controllers/department_designControllers');

router.route('/')
    .get(findAll)
    .post(create);

router.route('/:deptid/:desigid')
    .get(findOne)
    .patch(update)
    .delete(deleteDepartment_design);

module.exports = router;