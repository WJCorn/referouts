const express = require('express');
const router = express.Router();
const ReferralSource = require('../models/ReferralSource');

router.post('/match', async (req, res) => {
  const { insurance, level, state } = req.body;

  try {
    // Try perfect match first
    let matches = await ReferralSource.find({
      insurances: insurance,
      levels: level,
      state: state
    });

    // If no perfect match, try same insurance + level only
    if (matches.length === 0) {
      matches = await ReferralSource.find({
        insurances: insurance,
        levels: level
      });
    }

    // Final fallback: match by level only
    if (matches.length === 0) {
      matches = await ReferralSource.find({
        levels: level
      });
    }

    res.json({ results: matches });
  } catch (err) {
    console.error('❌ Match error:', err);
    res.status(500).json({ message: '❌ Matching failed' });
  }
});

module.exports = router;