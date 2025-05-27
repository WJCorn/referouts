const express = require('express');
const router = express.Router();
const matchFacilities = require('../utils/matchFacilities');

// POST /api/referrals/match
router.post('/match', async (req, res) => {
  try {
    const referral = req.body;

    if (!referral || !referral.insurance || !referral.levelOfCare) {
      return res.status(400).json({ error: 'Missing required referral criteria' });
    }

    const matches = await matchFacilities(referral);

    res.json({ matches });
  } catch (err) {
    console.error('Match error:', err);
    res.status(500).json({ error: 'Failed to match facilities' });
  }
});

module.exports = router;