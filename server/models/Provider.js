const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactEmail: { type: String, required: true },
  phone: String,
  website: String,
  insuranceAccepted: [String],
  levelsOfCare: [String],
  address: {
    street: String,
    city: String,
    state: { type: String, index: true },
    zip: { type: String, index: true },
  },
  notes: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Provider', ProviderSchema);