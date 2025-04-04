const Country = require("../models/country");

// Create a new country
exports.create = async (req, res) => {
  try {
    const country = await Country.create({ name: req.body.name }); // Fix: Changed 'CountryName' to 'name'
    res.status(201).json({ success: true, country });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all countries
exports.findAll = async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.status(200).json({ success: true, countries });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a country by ID
exports.findOne = async (req, res) => {
  try {
    const country = await Country.findByPk(req.params.id);
    if (!country) {
      return res.status(404).json({ success: false, message: "Country not found" });
    }
    res.status(200).json({ success: true, country });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a country by ID
exports.update = async (req, res) => {
  try {
    const updated = await Country.update(
      { name: req.body.name }, // Fix: Updating the correct field
      { where: { id: req.params.id } } // Fix: Changed 'countryid' to 'id'
    );

    if (updated[0] === 0) {
      return res.status(404).json({ success: false, message: "Country not found" });
    }

    const updatedCountry = await Country.findByPk(req.params.id);
    res.status(200).json({ success: true, updatedCountry });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a country by ID
exports.deleteCountry = async (req, res) => {
  try {
    const deleted = await Country.destroy({ where: { id: req.params.id } }); // Fix: Changed 'countryid' to 'id'

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Country not found" });
    }

    res.status(200).json({ success: true, message: "Country deleted" }); // Fix: Changed status code from 204 to 200
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
