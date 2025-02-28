const express = require("express");
const router = express.Router();
const { create,findAll,findOne,update,deleteCustomer} = require("../controllers/customerControllers");

router.route('/')
.get(findAll)
.post(create);

router.route('/:id')
.get(findOne)
.patch(update)
.delete(deleteCustomer);

module.exports = router;