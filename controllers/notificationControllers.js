const Notification = require("../models/notification");

// Create a new notification
exports.createNotification = async (req, res) => {
    try {
        const { userId, message } = req.body;
        const notification = await Notification.create({ userId, message });
        res.status(201).json({ success: true, notification });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all notifications
exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll();
        res.status(200).json({ success: true, notifications });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get notifications by user ID
exports.getNotificationsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const notifications = await Notification.findAll({ where: { userId } });
        res.status(200).json({ success: true, notifications });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete a notification by ID
exports.deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Notification.destroy({ where: { id } });
        if (deleted) {
            res.status(200).json({ success: true, message: "Notification deleted" });
        } else {
            res.status(404).json({ success: false, message: "Notification not found" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete all notifications for a user
exports.clearUserNotifications = async (req, res) => {
    try {
        const { userId } = req.params;
        const deleted = await Notification.destroy({ where: { userId } });
        if (deleted) {
            res.status(200).json({ success: true, message: "All notifications cleared for the user" });
        } else {
            res.status(404).json({ success: false, message: "No notifications found for this user" });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
