const mongoose = require('mongoose');

const FacilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String
  },
  phone: String,
  email: String,
  website: String,
  insuranceAccepted: [String],
  levelsOfCare: [String],
  services: [String],

  // 🔗 Links
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', default: null },
  parentNetwork: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', default: null },

  // ⏱️ Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Facility', FacilitySchema);