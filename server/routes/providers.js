const express = require('express');
const router = express.Router();

router.post('/submit', async (req, res) => {
  try {
    const { name, state, insurances, levels } = req.body;

    const provider = {
      name,
      state,
      insurances: insurances.split(',').map(i => i.trim()),
      levels: levels.split(',').map(l => l.trim()),
      createdAt: new Date()
    };

    console.log('Submitted provider:', provider);

    res.json({ message: '✅ Provider submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '❌ Failed to submit provider' });
  }
});

module.exports = router;
