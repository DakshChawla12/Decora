const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationControllers");

// Create a new notification
router.post("/", notificationController.createNotification);

// Get all notifications
router.get("/", notificationController.getAllNotifications);

// Get notifications by user ID
router.get("/user/:userId", notificationController.getNotificationsByUser);

// Delete a notification by ID
router.delete("/:id", notificationController.deleteNotification);

// Delete all notifications for a user
router.delete("/user/:userId", notificationController.clearUserNotifications);

module.exports = router;
