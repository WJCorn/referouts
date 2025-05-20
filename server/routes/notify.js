const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Missing email." });

  try {
    const transporter = nodemailer.createTransport({
      service: "iCloud",
      auth: {
        user: process.env.ICLOUD_EMAIL,
        pass: process.env.ICLOUD_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Referouts Notifications" <${process.env.ICLOUD_EMAIL}>`,
      to: "info@referouts.com",
      subject: "New Early Access Signup",
      text: `New signup email: ${email}`,
    });

    res.status(200).json({ message: "Email sent" });
  } catch (err) {
    console.error("❌ Mail error:", err);
    res.status(500).json({ message: "Failed to send email" });
  }
});

module.exports = router;
