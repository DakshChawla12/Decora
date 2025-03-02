const express = require("express");
const router = express.Router();
const { create,findAll,findOne,update,deleteUser} = require("../controllers/userControllers");

router.route('/')
.get(findAll)
.post(create);

router.route('/:id')
.get(findOne)
.patch(update)
.delete(deleteUser);

module.exports = router;