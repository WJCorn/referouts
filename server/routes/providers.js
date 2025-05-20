const express = require('express');
const router = express.Router();
const Provider = require('../models/Provider');

// POST /providers
router.post('/', async (req, res) => {
  try {
    const {
      name,
      contactEmail,
      phone,
      website,
      insuranceAccepted,
      levelsOfCare,
      address,
      notes
    } = req.body;

    if (!name || !contactEmail) {
      return res.status(400).json({ error: 'Name and contact email are required.' });
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(contactEmail)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }

    // Prevent duplicate entries by contactEmail
    const existing = await Provider.findOne({ contactEmail });
    if (existing) {
      return res.status(409).json({ error: 'A provider with this contact email already exists.' });
    }

    const newProvider = new Provider({
      name,
      contactEmail,
      phone,
      website,
      insuranceAccepted,
      levelsOfCare,
      address,
      notes
    });

    await newProvider.save();

    res.status(201).json({ message: '✅ Provider submitted successfully.' });
  } catch (err) {
    console.error('❌ Error submitting provider:', err);
    res.status(500).json({ error: 'Server error submitting provider.' });
  }
});

// GET /providers
router.get('/', async (req, res) => {
  try {
    const providers = await Provider.find().sort({ createdAt: -1 });
    res.json(providers);
  } catch (err) {
    console.error('❌ Error fetching providers:', err);
    res.status(500).json({ error: 'Failed to fetch providers.' });
  }
});

module.exports = router;
