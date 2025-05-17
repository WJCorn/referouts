const express = require('express');
const router = express.Router();
const Provider = require('../models/Provider');

router.post('/', async (req, res) => {
  try {
    const {
      name,
      state,
      insurances,
      levelsOfCare
    } = req.body;

    const newProvider = new Provider({
      name,
      state,
      insurances: Array.isArray(insurances)
        ? insurances
        : insurances.split(',').map(i => i.trim()),

      levelsOfCare: Array.isArray(levelsOfCare)
        ? levelsOfCare
        : levelsOfCare.split(',').map(l => l.trim())
    });

    await newProvider.save();
    res.json({ message: '✅ Provider submitted successfully' });

  } catch (err) {
    console.error('❌ Error saving provider:', err);
    res.status(500).json({ message: '❌ Server error while saving provider' });
  }
});

module.exports = router;