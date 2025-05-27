const express = require('express');
const normalizeFacility = require('../../utils/normalizeFacility');

const router = express.Router();

// POST /import/salesforce
router.post('/', async (req, res) => {
  try {
    const { records = [], mapping = {}, orgId = '' } = req.body;
    const source = 'salesforce';

    const normalized = records.map(record =>
      normalizeFacility(record, mapping, orgId, source)
    );

    res.json({ imported: normalized.length, facilities: normalized });
  } catch (err) {
    console.error('Salesforce import error:', err);
    res.status(500).json({ error: 'Failed to import Salesforce records' });
  }
});

module.exports = router;