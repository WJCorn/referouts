const express = require('express');
const router = express.Router();
const Referral = require('../models/Referral');
const apiKeyAuth = require('../middleware/apiKeyAuth');

router.post('/send', apiKeyAuth, async (req, res) => {
  try {
    const { patientName, insurance, levelOfCare, location, notes, sentBy } = req.body;

    if (!patientName || !insurance || !levelOfCare || !location || !sentBy) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const referral = new Referral({
      patientName,
      insurance,
      levelOfCare,
      location,
      notes,
      sentBy
    });

    await referral.save();
    res.status(201).json({ message: 'Referral received', id: referral._id });
  } catch (err) {
    console.error('Error saving referral:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;