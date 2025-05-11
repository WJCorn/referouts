const express = require('express');
const router = express.Router();
const ReferralSource = require('../models/ReferralSource');

router.post('/submit', async (req, res) => {
  try {
    const { name, state, insurances, levels } = req.body;

    const provider = new ReferralSource({
      name,
      state,
      insurances: insurances.split(',').map(i => i.trim()),
      levels: levels.split(',').map(l => l.trim())
    });

    await provider.save();

    res.json({ message: '✅ Provider submitted successfully' });
  } catch (err) {
    console.error('❌ MongoDB save error:', err);
    res.status(500).json({ message: '❌ Failed to submit provider' });
  }
});

module.exports = router;