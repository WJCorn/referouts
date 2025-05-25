const express = require('express');
const router = express.Router();
const Provider = require('../models/Provider');

// GET all providers
router.get('/', async (req, res) => {
  try {
    const providers = await Provider.find();
    res.json(providers);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET a single provider by ID
router.get('/:id', async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) return res.status(404).json({ error: 'Provider not found' });
    res.json(provider);
  } catch (err) {
    console.error('Fetch by ID error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new provider
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
    } = req.body;

    if (!name || !contactEmail) {
      return res.status(400).json({ error: 'Name and contact email are required.' });
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
    });

    await newProvider.save();
    res.status(201).json({ message: 'Provider submitted successfully.' });
  } catch (err) {
    console.error('Error submitting provider:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT to update a provider
router.put('/:id', async (req, res) => {
  try {
    const updated = await Provider.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'Provider not found.' });
    }
    res.json(updated);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a provider
router.delete('/:id', async (req, res) => {
  try {
    await Provider.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Provider deleted successfully.' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;