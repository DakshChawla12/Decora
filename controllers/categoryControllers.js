const Category = require("../models/category");

// Create a new category
exports.create = async (req, res) => {
  try {
    const category = await Category.create({ name: req.body.name });
    res.status(201).json({ success: true, category });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({ success: false, error: "Validation error: " + error.message });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all categories
exports.findAll = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a category by ID
exports.findOne = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a category by ID
exports.update = async (req, res) => {
  try {
    const updated = await Category.update(
      { name: req.body.name },
      { where: { id: req.params.id } }
    );

    if (updated[0] === 0) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    const updatedCategory = await Category.findByPk(req.params.id);
    res.status(200).json({ success: true, updatedCategory });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.destroy({ where: { id: req.params.id } });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
