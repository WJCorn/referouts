const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  name: String,
  state: String,
  city: String,
  insurances: [String],
  levelsOfCare: [String]
});

module.exports = mongoose.model('Provider', providerSchema);