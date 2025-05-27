const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const referralSendRoute = require('./routes/referralSend');
const referralMatchesRoute = require('./routes/referralMatches');
const referralsRoute = require('./routes/referrals');
const providersRoute = require('./routes/providers');
const facilitiesRoute = require('./routes/facilities');
const seedRoute = require('./routes/seed');
const earlySignupRoute = require('./routes/earlySignup');
const testRoute = require('./routes/test');
const adminRoute = require('./routes/admin');
const usersRoute = require('./routes/users');
const importCsvRoute = require('./routes/import/csv');
const importSfRoute = require('./routes/import/salesforce');
const matchWeightsRoute = require('./routes/admin/matchWeights');

const app = express();

// Load environment variables
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

// === ✅ API Routes (Protected/Scoped) ===
app.use('/api/referrals', referralSendRoute);
app.use('/api/referrals', referralMatchesRoute);
app.use('/api/seed', seedRoute);
app.use('/api/early-signup', earlySignupRoute);
app.use('/api/users', usersRoute);

// === 🔁 Open Routes ===
app.use('/referrals', referralsRoute);
app.use('/providers', providersRoute);
app.use('/facilities', facilitiesRoute);
app.use('/test', testRoute);
app.use('/admin', adminRoute);
app.use('/admin', matchWeightsRoute);
app.use('/import/csv', importCsvRoute);
app.use('/import/salesforce', importSfRoute);

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