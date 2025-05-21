// models/Provider.js
const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isNetwork: { type: Boolean, default: false },
  logoUrl: String,
  description: String,
  contactEmail: { type: String, required: true },
  phone: String,
  website: String,
  address: {
    street: String,
    city: String,
    state: String,
    zip: String
  },
  insuranceAccepted: [String],
  levelsOfCare: [String],
  services: [String],
  subFacilities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Facility' }]
});

module.exports = mongoose.model('Provider', ProviderSchema);