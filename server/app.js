const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();

// Load env vars
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());

// Route handlers
app.use('/referrals', require('./routes/referrals'));
app.use('/providers', require('./routes/providers'));
app.use('/test', require('./routes/test'));
app.use('/api/seed', require('./routes/seed'));
app.use('/api/early-signup', require('./routes/earlySignup'));
app.use('/providers', providersRoute);
app.use('/facilities', facilitiesRoute);

// Health check
app.get('/ping', (req, res) => res.send('pong'));

// Root route to confirm app is running
app.get('/', (req, res) => {
  res.send('🚀 Referouts backend is up and running!');
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
