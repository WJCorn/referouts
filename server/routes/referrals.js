const express = require('express');
const router = express.Router();
const Provider = require('../models/Provider');

router.get('/', async (req, res) => {
  const { insurance, state, levelOfCare } = req.query;

  try {
    // Step 1: Try to find exact matches
    const primaryQuery = {
      ...(insurance && { insurances: { $regex: insurance, $options: 'i' } }),
      ...(state && { state: { $regex: state, $options: 'i' } }),
      ...(levelOfCare && { levelsOfCare: { $regex: levelOfCare, $options: 'i' } }),
    };

    const matches = await Provider.find(primaryQuery).limit(10);

    if (matches.length > 0) {
      return res.json(matches);
    }

    // Step 2: Fallback — match by insurance + levelOfCare only
    const fallbackQuery = {
      ...(insurance && { insurances: { $regex: insurance, $options: 'i' } }),
      ...(levelOfCare && { levelsOfCare: { $regex: levelOfCare, $options: 'i' } }),
    };

    const fallbackMatches = await Provider.find(fallbackQuery).limit(5);
    res.json(fallbackMatches);

  } catch (err) {
    console.error('❌ Referral match error:', err);
    res.status(500).json({ message: '❌ Server error matching referrals' });
  }
});

module.exports = router;
