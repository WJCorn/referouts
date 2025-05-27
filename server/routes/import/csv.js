const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const normalizeFacility = require('../../utils/normalizeFacility');
const Facility = require('../../models/Facility');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// POST /import/csv
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const mapping = req.body.mapping ? JSON.parse(req.body.mapping) : {};
    const orgId = req.body.orgId || 'defaultOrg';
    const source = 'csv';

    const results = [];
    const filePath = path.resolve(req.file.path);

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        const facility = normalizeFacility(row, mapping, orgId, source);
        results.push(facility);
      })
      .on('end', async () => {
        try {
          fs.unlinkSync(filePath); // clean up uploaded file

          // ✅ Save to MongoDB
          const saved = await Facility.insertMany(results);
          res.json({ imported: saved.length, facilities: saved });
        } catch (dbErr) {
          console.error('MongoDB save error:', dbErr);
          res.status(500).json({ error: 'Failed to save facilities to DB' });
        }
      });
  } catch (err) {
    console.error('CSV import error:', err);
    res.status(500).json({ error: 'Failed to import CSV' });
  }
});

module.exports = router;