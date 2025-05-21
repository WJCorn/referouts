const express = require('express');
const router = express.Router();
const Facility = require('../models/Facility');
const Provider = require('../models/Provider');

// POST /facilities
router.post('/', async (req, res) => {
  try {
    const facility = new Facility(req.body);
    await facility.save();

    // Link to parent provider if exists
    if (facility.parentNetwork) {
      await Provider.findByIdAndUpdate(facility.parentNetwork, {
        $push: { subFacilities: facility._id }
      });
    }

    res.status(201).json({ message: '✅ Facility created successfully.', facility });
  } catch (err) {
    console.error('❌ Error creating facility:', err);
    res.status(500).json({ error: 'Server error creating facility.' });
  }
});

// GET /facilities/:id
router.get('/:id', async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) {
      return res.status(404).json({ error: 'Facility not found.' });
    }
    res.json(facility);
  } catch (err) {
    console.error('❌ Error fetching facility:', err);
    res.status(500).json({ error: 'Server error fetching facility.' });
  }
});

module.exports = router;