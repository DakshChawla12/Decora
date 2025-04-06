const {Product,Category,Brand} = require('../models/associations');

// Create a new product
exports.create = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, product });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all products (including brand and category)
exports.findAll = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [
                { model: Category, as: 'category' },
                { model: Brand, as: 'brand' }
            ]
        });
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get a product by ID (including brand and category)
exports.findOne = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [
                { model: Category, as: 'category' },
                { model: Brand, as: 'brand' }
            ]
        });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update a product by ID
exports.update = async (req, res) => {
    try {
        const [updated] = await Product.update(req.body, {
            where: { productId: req.params.id },
        });

        if (updated === 0) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const updatedProduct = await Product.findByPk(req.params.id, {
            include: [
                { model: Category, as: 'category' },
                { model: Brand, as: 'brand' }
            ]
        });

        res.status(200).json({ success: true, updatedProduct });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const deleted = await Product.destroy({
            where: { productId: req.params.id },
        });

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Product not found!" });
        }

        res.status(200).json({ success: true, message: "Product deleted successfully!" });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
