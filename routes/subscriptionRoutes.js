const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionControllers");

// Create a new subscription
router.post("/", subscriptionController.createSubscription);

// Get all subscriptions
router.get("/", subscriptionController.getAllSubscriptions);

// Get a subscription by ID
router.get("/:id", subscriptionController.getSubscriptionById);

// Get subscriptions by user ID
router.get("/user/:userId", subscriptionController.getSubscriptionsByUser);

// Update a subscription by ID
router.put("/:id", subscriptionController.updateSubscription);

// Delete a subscription by ID
router.delete("/:id", subscriptionController.deleteSubscription);

module.exports = router;
