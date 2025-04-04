const Cart = require("../models/cart");
const Customer = require("../models/customer");
const Product = require("../models/product");

// Add product to cart
exports.addToCart = async (req, res) => {
    try {
        const { customerId, productId, quantity } = req.body;

        const customer = await Customer.findByPk(customerId);
        const product = await Product.findByPk(productId);

        if (!customer) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const cartItem = await Cart.create({ customerId, productId, quantity });
        res.status(201).json({ success: true, cartItem });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all cart items for a customer
exports.getCartItems = async (req, res) => {
    try {
        const { customerId } = req.params;
        const cartItems = await Cart.findAll({ where: { customerId }, include: [Product] });
        res.status(200).json({ success: true, cartItems });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
    try {
        const { customerId, productId } = req.params;
        const { quantity } = req.body;

        const updated = await Cart.update({ quantity }, { where: { customerId, productId } });
        if (updated[0]) {
            const updatedCartItem = await Cart.findOne({ where: { customerId, productId } });
            res.status(200).json({ success: true, updatedCartItem });
        } else {
            res.status(404).json({ success: false, message: "Cart item not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Remove an item from the cart
exports.removeCartItem = async (req, res) => {
    try {
        const { customerId, productId } = req.params;
        const deleted = await Cart.destroy({ where: { customerId, productId } });
        if (deleted) {
            res.status(204).json({ success: true, message: "Cart item removed" });
        } else {
            res.status(404).json({ success: false, message: "Cart item not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Clear cart for a customer
exports.clearCart = async (req, res) => {
    try {
        const { customerId } = req.params;
        await Cart.destroy({ where: { customerId } });
        res.status(200).json({ success: true, message: "Cart cleared" });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
