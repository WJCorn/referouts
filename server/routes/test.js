const express = require('express');
const router = express.Router();
const Provider = require('../models/Provider');

// ✅ GET /referrals/test-ping
router.get('/test-ping', (req, res) => {
  res.send('pong from /referrals/test-ping');
});

// ✅ POST /referrals/seed
router.post('/seed', async (req, res) => {
  try {
    await Provider.create({
      name: 'Recovery Wellness',
      state: 'GA',
      city: 'Atlanta',
      insurances: ['Aetna', 'Cigna'],
      levelsOfCare: ['PHP', 'IOP']
    });
    res.send('Seeded');
  } catch (err) {
    console.error(err);
    res.status(500).send('Seeding failed');
  }
});

module.exports = router;
