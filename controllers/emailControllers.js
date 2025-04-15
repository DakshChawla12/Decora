const SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv").config();

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const sendEmail = (req, res) => {
    const { name, to, message } = req.body;

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = "We've received your message!";
    sendSmtpEmail.sender = { email: process.env.BREVO_EMAIL, name: "Decora Support" };
    sendSmtpEmail.to = [{ email: to }];

    sendSmtpEmail.htmlContent = `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
            <h2 style="color: #4CAF50;">Hello ${name},</h2>
            <p>Thank you for reaching out to <strong>Decora</strong>!</p>
            <p>We’ve received your message and our support team will get back to you shortly.</p>
            <hr style="margin: 20px 0;">
            <p style="font-style: italic; color: #555;">Your message:</p>
            <blockquote style="border-left: 4px solid #4CAF50; padding-left: 10px; color: #555;">
                ${message}
            </blockquote>
            <hr style="margin: 20px 0;">
            <p>If you have any urgent concerns, feel free to reply directly to this email.</p>
            <br>
            <p>Warm regards,<br>The Decora Team</p>
        </div>
    `;

    apiInstance
        .sendTransacEmail(sendSmtpEmail)
        .then(() => {
            res.status(200).json({
                success: true,
                message: "Confirmation email sent successfully",
            });
        })
        .catch((error) => {
            console.error("Error sending email:", error);
            res.status(500).json({ success: false, message: "Failed to send email" });
        });
};

const subscribeToNewsletter = async (req, res) => {
    try {
        const { email, name = "Subscriber" } = req.body;

        if (!email || email.trim() === "") {
            return res.status(400).json({ message: "Email is required." });
        }

        console.log("Subscribing and sending confirmation email to", email);

        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.subject = "Welcome to Decora Newsletter!";
        sendSmtpEmail.sender = { email: process.env.BREVO_EMAIL, name: "Decora Team" };
        sendSmtpEmail.to = [{ email }];

        sendSmtpEmail.htmlContent = `
            <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
                <h2 style="color: #4CAF50;">Hello ${name},</h2>
                <p>Thank you for subscribing to the <strong>Decora</strong> newsletter!</p>
                <p>You’ll now receive updates, exclusive offers, and the latest news straight to your inbox.</p>
                <hr style="margin: 20px 0;">
                <p>If you ever wish to unsubscribe, simply click the unsubscribe link in any of our emails.</p>
                <br>
                <p>Warm regards,<br>The Decora Team</p>
            </div>
        `;

        await apiInstance.sendTransacEmail(sendSmtpEmail);

        res.status(200).json({
            success: true,
            message: "Thank you for subscribing! A confirmation email has been sent.",
        });
    } catch (error) {
        console.error("Error subscribing to newsletter:", error);
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};

module.exports = { sendEmail, subscribeToNewsletter };
