const Region_Country = require("../models/region_country");

// Create a new region_country
exports.create = async (req, res) => {
    try {
        const region_country = await Region_Country.create({
            countryid: req.body.countryid,
            regionid: req.body.regionid,
        });
        res.status(201).json({ success: true, region_country });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all region_country records
exports.findAll = async (req, res) => {
    try {
        const region_country = await Region_Country.findAll();
        res.status(200).json({ success: true, region_country });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get a region_country by ID
exports.findOne = async (req, res) => {
    try {
        const { countryid, regionid } = req.params;
        const region_country = await Region_Country.findOne({
            where: { countryid, regionid },
        });

        if (region_country) {
            res.status(200).json({ success: true, region_country });
        } else {
            res.status(404).json({ success: false, message: "Region_Country not found!" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update a region_country by ID
exports.update = async (req, res) => {
    try {
        const { countryid, regionid } = req.params;
        const [updated] = await Region_Country.update(req.body, {
            where: { countryid, regionid },
        });

        if (updated) {
            const updated_Region_country = await Region_Country.findOne({
                where: { countryid, regionid },
            });
            res.status(200).json({ success: true, updated_Region_country });
        } else {
            res.status(404).json({ success: false, message: "Region_Country not found!!!" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete a region_country by ID
exports.deleteRegion_Country = async (req, res) => {
    try {
        const { countryid, regionid } = req.params;
        const deleted = await Region_Country.destroy({
            where: { countryid, regionid },
        });

        if (deleted) {
            res.status(204).json({ success: true, message: "Region_Country deleted" });
        } else {
            res.status(404).json({ success: false, message: "Region_Country not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
