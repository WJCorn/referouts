const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: String, // optional for now
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' },
  role: { type: String, enum: ['admin', 'provider'], default: 'provider' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);