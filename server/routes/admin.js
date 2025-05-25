const express = require('express');
const router = express.Router();
const Provider = require('../models/Provider');
const Facility = require('../models/Facility');

// Get all providers
router.get('/providers', async (req, res) => {
  try {
    const providers = await Provider.find();
    res.json(providers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch providers' });
  }
});

// Get a single provider and their linked facilities
router.get('/providers/:id', async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    const facilities = await Facility.find({ parentNetwork: req.params.id });
    res.json({ provider, facilities });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch provider data' });
  }
});

// Link a facility to a provider
router.put('/providers/:id/link-facility', async (req, res) => {
  const { facilityId } = req.body;

  if (!facilityId) return res.status(400).json({ error: 'Facility ID required' });

  try {
    const facility = await Facility.findById(facilityId);
    if (!facility) return res.status(404).json({ error: 'Facility not found' });

    facility.parentNetwork = req.params.id;
    await facility.save();

    res.json({ message: 'Facility linked successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to link facility' });
  }
});

// Unlink a facility
router.put('/facilities/:id/unlink', async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) return res.status(404).json({ error: 'Facility not found' });

    facility.parentNetwork = undefined;
    await facility.save();

    res.json({ message: 'Facility unlinked successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to unlink facility' });
  }
});

module.exports = router;