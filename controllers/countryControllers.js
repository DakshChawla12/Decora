const Country = require('../models/country');

// Create a new country
exports.create = async (req, res) => {
    try {
        const country = await Country.create({ CountryName: req.body.name });
        res.status(201).json({success:true , country});
    } catch (error) {
        res.status(400).json({ success:false , error: error.message });
    }
};

// Get all countries
exports.findAll = async (req, res) => {
    try {
        const countries = await Country.findAll();
        res.status(200).json({success:true , countries});
    } catch (error) {
        res.status(400).json({ success:false , error: error.message });
    }
};

// Get a country by ID
exports.findOne = async (req, res) => {
    try {
        const country = await Country.findByPk(req.params.id);
        if (country) {
            res.status(200).json({success:true , country});
        } else {
            res.status(404).json({ success:false , message: 'Country not found' });
        }
    } catch (error) {
        res.status(400).json({ success:false , error: error.message });
    }
};

// Update a country by ID
exports.update = async (req, res) => {
    try {
        const [updated] = await Country.update(req.body, {
            where: { countryid: req.params.id }
        });
        if (updated) {
            const updatedCountry = await Country.findByPk(req.params.id);
            res.status(200).json({success:true , updatedCountry});
        } else {
            res.status(404).json({ success:false , message: 'Country not found' });
        }
    } catch (error) {
        res.status(400).json({ success:false , error: error.message });
    }
};


// Delete a country by ID
exports.deleteCountry = async (req, res) => {
    try {
        const deleted = await Country.destroy({
            where: { countryid: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ success:true , message: 'Country deleted' });
        } else {
            res.status(404).json({ success:false , message: 'Country not found' });
        }
    } catch (error) {
        res.status(400).json({ success:false , error: error.message });
    }
};
