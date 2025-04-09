const { Order, OrderItem, Cart, Product, Customer, User } = require('../models/associations');

// ✅ Create a new order from the customer's cart
const createOrder = async (req, res) => {
    try {
        const customerId = req.user.customerId;

        const cartItems = await Cart.findAll({
            where: { customerId },
            include: [{ model: Product, as: 'product' }]
        });

        if (!cartItems.length) {
            return res.status(400).json({ success: false, message: 'Your cart is empty' });
        }

        const totalAmount = cartItems.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);

        const order = await Order.create({
            customerId,
            totalAmount,
            status: 'Pending',
        });

        const orderItemsData = cartItems.map(item => ({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
        }));

        await OrderItem.bulkCreate(orderItemsData);
        await Cart.destroy({ where: { customerId } });

        // ✅ Fetch all orders of the customer after placing new order
        const orders = await Order.findAll({
            where: { customerId },
            include: [
                {
                    model: OrderItem,
                    as: 'orderItems',
                    include: [{ model: Product, as: 'product' }]
                }
            ]
        });

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            orderId: order.id,
            orders
        });
    } catch (error) {
        console.error('Error creating order:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};


// ✅ Get all orders for the logged-in customer
const getOrdersByCustomer = async (req, res) => {
    try {
        const customerId = req.user.customerId;

        const orders = await Order.findAll({
            where: { customerId },
            include: [
                {
                    model: OrderItem,
                    as: 'orderItems',
                    include: [{ model: Product, as: 'product' }]
                }
            ]
        });

        if (!orders.length) {
            return res.status(404).json({ success: false, message: 'No orders found for this customer' });
        }

        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error('Error fetching customer orders:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Update order status and return all orders
const updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const { status } = req.body;

        const order = await Order.findByPk(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        order.status = status;
        await order.save();

        // 🔁 Fetch all orders (admin only)
        const orders = await Order.findAll({
            include: [
                {
                    model: OrderItem,
                    as: 'orderItems',
                    include: [{ model: Product, as: 'product' }]
                },
                {
                    model: Customer,
                    as: 'customer',
                    include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }]
                }
            ]
        });

        res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
            updatedStatus: order.status,
            orders
        });
    } catch (error) {
        console.error('Error updating order status:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};


// ✅ Admin: Get all orders
const getAllOrdersAdmin = async (req, res) => {
    try {
        if (req.user.roleId !== 1) {
            return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
        }

        const orders = await Order.findAll({
            include: [
                {
                    model: OrderItem,
                    as: 'orderItems',
                    include: [{ model: Product, as: 'product' }]
                },
                {
                    model: Customer,
                    as: 'customer',
                    include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }]
                }
            ]
        });

        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error('Error fetching all orders:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createOrder,
    getOrdersByCustomer,
    updateOrderStatus,
    getAllOrdersAdmin
};
