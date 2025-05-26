const express = require('express');
const router = express.Router();
const Provider = require('../models/Provider');
const apiKeyAuth = require('../middleware/apiKeyAuth');

router.get('/matches', apiKeyAuth, async (req, res) => {
  const { insurance, levelOfCare, location } = req.query;

  if (!insurance || !levelOfCare || !location) {
    return res.status(400).json({ error: 'Missing insurance, levelOfCare, or location in query.' });
  }

  try {
    const providers = await Provider.find({
      insuranceAccepted: { $regex: insurance, $options: 'i' },
      levelsOfCare: { $regex: levelOfCare, $options: 'i' },
      'address.state': { $regex: location, $options: 'i' }
    }).limit(10);

    // Optional fallback: loosen criteria if nothing found
    if (providers.length === 0) {
      const fallback = await Provider.find({
        levelsOfCare: { $regex: levelOfCare, $options: 'i' }
      }).limit(10);
      return res.json({ matches: fallback, fallbackUsed: true });
    }

    res.json({ matches: providers, fallbackUsed: false });
  } catch (err) {
    console.error('Match lookup failed:', err);
    res.status(500).json({ error: 'Server error during match lookup' });
  }
});

module.exports = router;