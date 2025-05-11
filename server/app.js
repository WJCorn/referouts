const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Test route
app.get('/ping', (req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
