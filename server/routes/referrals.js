const express = require('express');
const router = express.Router();

router.post('/match', async (req, res) => {
  const { zip, insurance, level } = req.body;

  // Simulated matching logic
  const results = [
    {
      name: 'Example Recovery Center',
      city: 'Tampa',
      state: 'FL'
    }
  ];

  res.json({ results });
});

module.exports = router;