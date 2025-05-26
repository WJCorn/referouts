const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  clerkId: { type: String, required: true, unique: true },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' },
  role: { type: String, enum: ['admin', 'provider'], default: 'provider' },
  isOnboardingComplete: { type: Boolean, default: false } // ✅ Add this line
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);