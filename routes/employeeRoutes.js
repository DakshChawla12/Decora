const express = require("express");
const router = express.Router();
const { create,findAll,findOne,update,deleteEmployee} = require("../controllers/employeeControllers");

router.route('/')
.get(findAll)
.post(create);

router.route('/:id')
.get(findOne)
.patch(update)
.delete(deleteEmployee);

module.exports = router;