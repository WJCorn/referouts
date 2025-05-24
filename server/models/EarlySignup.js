const mongoose = require('mongoose');

const earlySignupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  organization: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String }, // optional
}, { timestamps: true });

module.exports = mongoose.model('EarlySignup', earlySignupSchema);