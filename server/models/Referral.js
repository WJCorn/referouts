const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  patientName: String,
  insurance: String,
  levelOfCare: String,
  location: String,
  notes: String,
  sentBy: String, // Salesforce Org, email, or user
  matchedProviders: [String], // Future use
}, { timestamps: true });

module.exports = mongoose.model('Referral', referralSchema);
