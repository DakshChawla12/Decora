const Subscription = require("../models/subscription");

// Create a new subscription
exports.createSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.create(req.body);
        res.status(201).json({ success: true, subscription });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all subscriptions
exports.getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.findAll();
        res.status(200).json({ success: true, subscriptions });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get a subscription by ID
exports.getSubscriptionById = async (req, res) => {
    try {
        const subscription = await Subscription.findByPk(req.params.id);
        if (subscription) {
            res.status(200).json({ success: true, subscription });
        } else {
            res.status(404).json({ success: false, message: "Subscription not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get subscriptions by user ID
exports.getSubscriptionsByUser = async (req, res) => {
    try {
        const subscriptions = await Subscription.findAll({ where: { userId: req.params.userId } });
        res.status(200).json({ success: true, subscriptions });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update a subscription by ID
exports.updateSubscription = async (req, res) => {
    try {
        const [updated] = await Subscription.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedSubscription = await Subscription.findByPk(req.params.id);
            res.status(200).json({ success: true, updatedSubscription });
        } else {
            res.status(404).json({ success: false, message: "Subscription not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete a subscription by ID
exports.deleteSubscription = async (req, res) => {
    try {
        const deleted = await Subscription.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(200).json({ success: true, message: "Subscription deleted" });
        } else {
            res.status(404).json({ success: false, message: "Subscription not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};