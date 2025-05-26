const express = require('express');
const router = express.Router();
const User = require('../models/User');
const requireClerkAuth = require('../middleware/requireClerkAuth');

router.get('/me', requireClerkAuth, async (req, res) => {
  try {
    const { userId, user } = req.auth;
    const email = user?.emailAddresses?.[0]?.emailAddress;
    const name = user?.firstName + ' ' + (user?.lastName || '');

    if (!email) return res.status(400).json({ error: 'Email not found from Clerk user' });

    let existingUser = await User.findOne({ clerkId: userId });

    if (!existingUser) {
      existingUser = await User.create({
        clerkId: userId,
        email,
        name,
        isOnboardingComplete: false
      });
    }

    res.json(existingUser);
  } catch (err) {
    console.error('Error in /me route:', err);
    res.status(500).json({ error: 'Failed to fetch or create user' });
  }
});

module.exports = router;