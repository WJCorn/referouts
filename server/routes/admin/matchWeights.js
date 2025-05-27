const express = require('express');
const router = express.Router();
const MatchWeight = require('../../models/MatchWeight');

const ORG_ID = 'demoOrg'; // Replace later with dynamic value from auth/session

// GET /admin/match-weights
router.get('/match-weights', async (req, res) => {
  try {
    let weights = await MatchWeight.findOne({ orgId: ORG_ID });
    if (!weights) {
      weights = await MatchWeight.create({ orgId: ORG_ID });
    }
    res.json(weights);
  } catch (err) {
    console.error('Error fetching match weights:', err);
    res.status(500).json({ error: 'Failed to load weights' });
  }
});

// POST /admin/match-weights
router.post('/match-weights', async (req, res) => {
  try {
    const { insurance, levelOfCare, distance } = req.body;
    const updated = await MatchWeight.findOneAndUpdate(
      { orgId: ORG_ID },
      { insurance, levelOfCare, distance },
      { upsert: true, new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error('Error saving match weights:', err);
    res.status(500).json({ error: 'Failed to save weights' });
  }
});

module.exports = router;