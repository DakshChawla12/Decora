const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderControllers");
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddlewares');

router.post("/", isAuthenticated, orderController.createOrder);

router.get("/", isAuthenticated, orderController.getOrdersByCustomer);

router.get("/admin/all", isAuthenticated, isAdmin, orderController.getAllOrdersAdmin);

router.put("/:orderId", isAuthenticated, isAdmin, orderController.updateOrderStatus);

router.post('/confirm', isAuthenticated, orderController.confirmOrder);

module.exports = router;
