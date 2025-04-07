const {Cart,Customer,Product} = require('../models/associations');

exports.addToCart = async (req, res) => {
    try {
        const customerId = req.session.customerId; // Use customerId from session
        const { productId } = req.body;

        if (!customerId) {
            return res.status(401).json({ success: false, message: "Not logged in" });
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        let cartItem = await Cart.findOne({ where: { customerId, productId } });

        if (cartItem) {
            cartItem.quantity += 1;
            await cartItem.save();
        } else {
            cartItem = await Cart.create({ customerId, productId, quantity: 1 });
        }

        // Fetch updated cart with product details
        const fullCart = await Cart.findAll({
            where: { customerId },
            include: {
                model: Product,
                as: 'product' // Make sure you’ve defined this alias in the association
            }
        });

        res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            cart: fullCart
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};


// Get all cart items for a customer
exports.getCartItems = async (req, res) => {
    try {
        const { customerId } = req.session;

        if (!customerId) {
            return res.status(401).json({ success: false, message: "Customer not logged in" });
        }

        const cartItems = await Cart.findAll({
            where: { customerId },
            include: [{ model: Product, as: "product" }]
        });

        res.status(200).json({ success: true, cartItems });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
    try {
        const { customerId } = req.session;
        const { productId, quantity } = req.body; // quantity should be either +1 or -1

        if (!customerId) {
            return res.status(401).json({ success: false, message: "Customer not logged in" });
        }

        const cartItem = await Cart.findOne({ where: { customerId, productId } });

        if (!cartItem) {
            return res.status(404).json({ success: false, message: "Cart item not found" });
        }

        const newQuantity = cartItem.quantity + quantity;

        if (newQuantity <= 0) {
            await cartItem.destroy();
        } else {
            cartItem.quantity = newQuantity;
            await cartItem.save();
        }

        const updatedCart = await Cart.findAll({
            where: { customerId },
            include: [{ model: Product, as: "product" }]
        });

        res.status(200).json({ success: true, cart: updatedCart });

    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Remove an item from the cart
exports.removeCartItem = async (req, res) => {
    try {
        const { customerId } = req.session;
        const { productId } = req.body;

        if (!customerId) {
            return res.status(401).json({ success: false, message: "Customer not logged in" });
        }

        const deleted = await Cart.destroy({ where: { customerId, productId } });

        if (deleted) {
            const updatedCart = await Cart.findAll({
                where: { customerId },
                include: [{ model: Product, as: "product" }]
            });

            res.status(200).json({ success: true, message: "Cart item removed", cart: updatedCart });
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
        const { customerId } = req.session;

        if (!customerId) {
            return res.status(401).json({ success: false, message: "Customer not logged in" });
        }

        await Cart.destroy({ where: { customerId } });

        res.status(200).json({ success: true, message: "Cart cleared", cart: [] });

    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
