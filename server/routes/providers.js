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

    res.status(201).json({ message: 'Provider submitted successfully.' });
  } catch (err) {
    console.error('Error submitting provider:', err);
    res.status(500).json({ error: 'Server error submitting provider.' });
  }
});

module.exports = router;