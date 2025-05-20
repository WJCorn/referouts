const express = require('express');
const router = express.Router();
const EarlySignup = require('../models/EarlySignup');

router.post('/', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    const exists = await EarlySignup.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Already signed up' });

    const newSignup = new EarlySignup({ email });
    await newSignup.save();

    res.status(201).json({ message: '✅ Signup received. You’ll be notified about beta access soon.' });
  } catch (err) {
    console.error('❌ Error saving email:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;