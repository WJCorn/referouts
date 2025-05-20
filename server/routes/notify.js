const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// POST /notify
router.post('/', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.me.com',
      port: 587,
      secure: false,
      auth: {
        user: 'info@referouts.com',
        pass: process.env.ICLOUD_APP_PASSWORD
      },
      tls: {
        ciphers: 'SSLv3'
      }
    });

    await transporter.sendMail({
      from: 'Referouts <info@referouts.com>',
      to: 'info@referouts.com',
      subject: '📥 New Early Access Signup',
      text: `Someone signed up with the email: ${email}`,
      html: `<p><strong>New signup:</strong> ${email}</p>`
    });

    res.json({ message: '✅ Submission received!' });
  } catch (err) {
    console.error('❌ Email failed:', err);
    res.status(500).json({ message: '❌ Failed to send email' });
  }
});

module.exports = router;