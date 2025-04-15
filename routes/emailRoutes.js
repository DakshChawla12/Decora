const express = require("express");

const router = express.Router();
const {sendEmail,subscribeToNewsletter} = require("../controllers/emailControllers");

router.route("/sendfeedback").post(sendEmail);
router.route("/subscribe").post(subscribeToNewsletter);

module.exports = router;
