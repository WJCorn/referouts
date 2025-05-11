const mongoose = require('mongoose');

const ReferralSourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: String, required: true },
  insurances: [{ type: String }],
  levels: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ReferralSource', ReferralSourceSchema);