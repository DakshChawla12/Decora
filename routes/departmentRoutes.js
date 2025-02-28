const express = require('express');
const router = express.Router();
const { create, findAll, findOne, update, deleteDepartment } = require('../controllers/departmentControllers');

router.route('/')
    .get(findAll)
    .post(create);

router.route('/:id')
    .get(findOne)
    .patch(update)
    .delete(deleteDepartment);

module.exports = router;