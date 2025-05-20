const mongoose = require('mongoose');

const earlySignupSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  betaInviteSent: { type: Boolean, default: false }
});

module.exports = mongoose.model('EarlySignup', earlySignupSchema);