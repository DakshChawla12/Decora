const { Brand } = require("../models/associations");

// Create a new brand (Admin only)
exports.create = async (req, res) => {
    try {
        const brand = await Brand.create({ brandName: req.body.brandName });
        const brands = await Brand.findAll();
        console.log(`Brand created by admin: ${req.user?.email || 'Unknown user'}`);

        res.status(201).json({ success: true, brands });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all brands (Public)
exports.findAll = async (req, res) => {
    try {
        const brands = await Brand.findAll();
        res.status(200).json({ success: true, brands });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get a brand by ID (Public)
exports.findOne = async (req, res) => {
    try {
        const brand = await Brand.findByPk(req.params.id);
        if (brand) {
            res.status(200).json({ success: true, brand });
        } else {
            res.status(404).json({ success: false, message: "Brand not found!" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update a brand by ID (Admin only)
exports.update = async (req, res) => {
    try {
        const [updated] = await Brand.update(
            { brandName: req.body.brandName },
            { where: { brandId: req.params.id } }
        );

        if (updated) {
            const updatedBrand = await Brand.findByPk(req.params.id);

            console.log(`Brand updated by admin: ${req.user?.email || 'Unknown user'}`);
            const brands = await Brand.findAll();
            res.status(200).json({ success: true, brands });
        } else {
            res.status(404).json({ success: false, message: "Brand not found!" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete a brand by ID (Admin only)
exports.deleteBrand = async (req, res) => {
    try {
        const deleted = await Brand.destroy({
            where: { brandId: req.params.id },
        });
        const brands = await Brand.findAll();
        if (deleted) {
            console.log(`Brand deleted by admin: ${req.user?.email || 'Unknown user'}`);

            res.status(200).json({ success: true, message: "Brand deleted" ,brands});
        } else {
            res.status(404).json({ success: false, message: "Brand not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
