const Country_State = require("../models/country_state");

// Create a new country_state
exports.create = async (req, res) => {
    try {
        const country_state = await Country_State.create({
            countryid: req.body.countryid,
            stateid: req.body.stateid
        });
        res.status(201).json({ success: true, country_state });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all country_state records
exports.findAll = async (req, res) => {
    try {
        const countryStates = await Country_State.findAll();
        res.status(200).json({ success: true, countryStates });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get a country_state by ID
exports.findOne = async (req, res) => {
    try {
        const { countryid, stateid } = req.params;
        const country_state = await Country_State.findOne({
            where: { countryid, stateid }
        });

        if (country_state) {
            res.status(200).json({ success: true, country_state });
        } else {
            res.status(404).json({ success: false, message: "Country_State not found!" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update a country_state by ID
exports.update = async (req, res) => {
    try {
        const { countryid, stateid } = req.params;
        const [updated] = await Country_State.update(req.body, {
            where: { countryid, stateid }
        });

        if (updated) {
            const updatedCountryState = await Country_State.findOne({
                where: { countryid, stateid }
            });
            res.status(200).json({ success: true, updatedCountryState });
        } else {
            res.status(404).json({ success: false, message: "Country_State not found!!!" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete a country_state by ID
exports.deleteCountry_State = async (req, res) => {
    try {
        const { countryid, stateid } = req.params;
        const deleted = await Country_State.destroy({
            where: { countryid, stateid }
        });

        if (deleted) {
            res.status(204).json({ success: true, message: "Country_State deleted" });
        } else {
            res.status(404).json({ success: false, message: "Country_State not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
