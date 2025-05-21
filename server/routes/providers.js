const express = require('express');
const router = express.Router();
const Provider = require('../models/Provider');

// POST /providers — Create a new provider
router.post('/', async (req, res) => {
  try {
    const {
      name,
      contactEmail,
      phone,
      website,
      insuranceAccepted,
      levelsOfCare,
      address,
      notes,
      isNetwork,
      services,
      logoUrl
    } = req.body;

    if (!name || !contactEmail) {
      return res.status(400).json({ error: 'Name and contact email are required.' });
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(contactEmail)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }

    // Prevent duplicate entries by contactEmail
    const existing = await Provider.findOne({ contactEmail });
    if (existing) {
      return res.status(409).json({ error: 'A provider with this contact email already exists.' });
    }

    const newProvider = new Provider({
      name,
      contactEmail,
      phone,
      website,
      insuranceAccepted,
      levelsOfCare,
      address,
      notes,
      isNetwork,
      services,
      logoUrl
    });

    await newProvider.save();

    res.status(201).json({ message: '✅ Provider submitted successfully.', provider: newProvider });
  } catch (err) {
    console.error('❌ Error submitting provider:', err);
    res.status(500).json({ error: 'Server error submitting provider.' });
  }
});

// GET /providers — Fetch all providers adds count and sort by creation
const Facility = require('../models/Facility'); // make sure this is imported

router.get('/', async (req, res) => {
  try {
    const providers = await Provider.find().sort({ createdAt: -1 }).lean();

    const enriched = await Promise.all(
      providers.map(async (p) => {
        const facilityCount = await Facility.countDocuments({ parentNetwork: p._id });
        return { ...p, facilityCount };
      })
    );

    res.json(enriched);
  } catch (err) {
    console.error('❌ Error fetching providers with facility counts:', err);
    res.status(500).json({ error: 'Failed to fetch providers.' });
  }
});

// GET /providers/:id — Fetch single provider and populate sub-facilities if network
router.get('/:id', async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id).populate('subFacilities');
    if (!provider) {
      return res.status(404).json({ error: 'Provider not found.' });
    }
    res.json(provider);
  } catch (err) {
    console.error('❌ Error fetching provider by ID:', err);
    res.status(500).json({ error: 'Server error fetching provider.' });
  }
});

module.exports = router;