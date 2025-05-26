const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const referralSendRoute = require('./routes/referralSend');
const referralMatchesRoute = require('./routes/referralMatches');

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
const referralsRoute = require('./routes/referrals');
const providersRoute = require('./routes/providers');
const facilitiesRoute = require('./routes/facilities');
const seedRoute = require('./routes/seed');
const earlySignupRoute = require('./routes/earlySignup');
const testRoute = require('./routes/test');

app.use('/referrals', referralsRoute);
app.use('/providers', providersRoute);
app.use('/facilities', facilitiesRoute);
app.use('/api/seed', seedRoute);
app.use('/api/early-signup', earlySignupRoute);
app.use('/test', testRoute);
app.use('/admin', require('./routes/admin'));
app.use('/api/referrals', referralSendRoute);
app.use('/api/referrals', referralMatchesRoute);


// Health check
app.get('/ping', (req, res) => res.send('pong'));

// Root route
app.get('/', (req, res) => {
  res.send('🚀 Referouts backend is up and running!');
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});