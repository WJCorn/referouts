const mongoose = require('mongoose');

const ReferralSourceSchema = new mongoose.Schema({
  name: String,
  state: String,
  insurances: [String],
  levels: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ReferralSource', ReferralSourceSchema);