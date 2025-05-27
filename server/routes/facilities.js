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

// GET /facilities (with optional providerId filter)
router.get('/', async (req, res) => {
  try {
    const query = {};
    if (req.query.providerId) {
      query.providerId = req.query.providerId;
    }

    const facilities = await Facility.find(query);
    res.json(facilities);
  } catch (err) {
    console.error('❌ Error fetching facilities:', err);
    res.status(500).json({ error: 'Server error fetching facilities.' });
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

// PUT /facilities/:id/link
router.put('/:id/link', async (req, res) => {
  try {
    const { providerId } = req.body;
    if (!providerId) return res.status(400).json({ error: 'Provider ID is required' });

    const facility = await Facility.findByIdAndUpdate(
      req.params.id,
      { providerId },
      { new: true }
    );

    if (!facility) {
      return res.status(404).json({ error: 'Facility not found.' });
    }

    res.json({ message: '✅ Facility linked to provider.', facility });
  } catch (err) {
    console.error('❌ Error linking facility:', err);
    res.status(500).json({ error: 'Server error linking facility.' });
  }
});

// ✅ PUT /facilities/:id – Update facility by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Facility.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Facility not found.' });
    }

    res.json({ message: '✅ Facility updated successfully.', facility: updated });
  } catch (err) {
    console.error('❌ Error updating facility:', err);
    res.status(500).json({ error: 'Server error updating facility.' });
  }
});

module.exports = router;