const mongoose = require('mongoose');

const MatchWeightSchema = new mongoose.Schema({
  orgId: { type: String, required: true, unique: true },
  insurance: { type: Number, default: 30 },
  levelOfCare: { type: Number, default: 30 },
  distance: { type: Number, default: 40 }
}, { timestamps: true });

module.exports = mongoose.model('MatchWeight', MatchWeightSchema);