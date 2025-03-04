const Products = require('../models/product');

// Create a new product
exports.create = async (req, res) => {
    try {
        const product = await Products.create(req.body);
        res.status(201).json({ success: true, product });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all products
exports.findAll = async (req, res) => {
    try {
        const products = await Products.findAll();
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get a product by ID
exports.findOne = async (req, res) => {
    try {
        const product = await Products.findByPk(req.params.id);
        if (product) {
            res.status(200).json({ success: true, product });
        } else {
            res.status(404).json({ success: false, message: "Products not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update a product by ID
exports.update = async (req, res) => {
    try {
        const [updated] = await Products.update(req.body, {
            where: { productID: req.params.id },
        });
        if (updated) {
            const updatedProduct = await Products.findByPk(req.params.id);
            res.status(200).json({ success: true, updatedProduct });
        } else {
            res.status(404).json({ success: false, message: "Product not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const deleted = await Products.destroy({
            where: { productID: req.params.id },
        });
        if (deleted) {
            res.status(204).json({ success: true, message: "Product deleted" });
        } else {
            res.status(404).json({ success: false, message: "Product not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
