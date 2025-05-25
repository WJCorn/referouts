const express = require('express');
const router = express.Router();
const EarlySignup = require('../models/EarlySignup');
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/', async (req, res) => {
  try {
    const { name, organization, email, phone } = req.body;

    if (!name || !organization || !email) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    // Save to MongoDB
    const signup = new EarlySignup({ name, organization, email, phone });
    await signup.save();

    // Send email notification via Resend (non-blocking)
    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: process.env.NOTIFY_EMAIL,
        subject: '📩 New Early Access Submission',
        html: `
          <h2>New Early Access Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Organization:</strong> ${organization}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        `,
      });
    } catch (emailErr) {
      console.error('❌ Resend failed:', emailErr.message);
    }

    res.status(201).json({ message: 'Signup saved successfully.' });
  } catch (err) {
    console.error('❌ Error in /early-signup:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;