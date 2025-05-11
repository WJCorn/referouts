const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

// Load env vars
dotenv.config();

//Mongoose caboose
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/referrals', require('./routes/referrals'));
app.use('/providers', require('./routes/providers'));

// Health check
app.get('/ping', (req, res) => res.send('pong'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});