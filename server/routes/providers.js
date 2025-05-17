const express = require('express');
const router = express.Router();
const Provider = require('../models/Provider');

// Create a new provider
router.post('/', async (req, res) => {
  try {
    const { name, state, insurances, levelsOfCare } = req.body;

    const provider = new Provider({
      name,
      state,
      insurances: insurances.map(i => i.trim()),
      levelsOfCare: levelsOfCare.map(l => l.trim()),
    });

    const saved = await provider.save();
    res.status(201).json({ message: '✅ Provider saved successfully', data: saved });
  } catch (err) {
    console.error('❌ Error saving provider:', err);
    res.status(500).json({ message: '❌ Failed to save provider' });
  }
});

// (Optional) Get all providers
router.get('/', async (req, res) => {
  try {
    const providers = await Provider.find();
    res.json(providers);
  } catch (err) {
    console.error('❌ Error fetching providers:', err);
    res.status(500).json({ message: '❌ Failed to fetch providers' });
  }
});

module.exports = router;