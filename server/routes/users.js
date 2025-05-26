const express = require('express');
const router = express.Router();
const User = require('../models/User');
const requireClerkAuth = require('../middleware/requireClerkAuth');

router.get('/me', requireClerkAuth, async (req, res) => {
  try {
    const { userId, sessionId, getToken, orgId, orgRole } = req.auth;
    const { emailAddresses } = req.auth.user;

    const email = emailAddresses?.[0]?.emailAddress;

    if (!email) return res.status(400).json({ error: 'Email not found from Clerk user' });

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }

    res.json(user);
  } catch (err) {
    console.error('Error in /me route:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

module.exports = router;