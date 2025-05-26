module.exports = function apiKeyAuth(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.REFEROUTS_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized – invalid API key' });
  }
  next();
};