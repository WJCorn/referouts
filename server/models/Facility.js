// models/Facility.js
const mongoose = require('mongoose');

const FacilitySchema = new mongoose.Schema({
  parentNetwork: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' },
  name: { type: String, required: true },
  logoUrl: String,
  contactEmail: String,
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
  services: [String]
});

module.exports = mongoose.model('Facility', FacilitySchema);