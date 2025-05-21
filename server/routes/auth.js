const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Clerk will verify JWT before this runs
router.get('/me', async (req, res) => {
  try {
    const clerkId = req.headers['x-clerk-user-id']; // placeholder for Clerk's real user ID

    if (!clerkId) return res.status(401).json({ error: 'Not authorized' });

    const user = await User.findOne({ clerkId: clerkId }).lean();

    if (!user) {
      return res.status(404).json({ error: 'User not found in app database' });
    }

    res.json({
      role: user.role,
      providerId: user.providerId,
      email: user.email,
    });
  } catch (err) {
    console.error('Error in /auth/me:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;