const rateLimit = require("express-rate-limit");

// Limit requests to 5 per minute per IP
const grammarCheckLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Max 5 requests per minute
  message: { error: "Too many requests, please try again later." },
  headers: true,
});

module.exports = grammarCheckLimiter;
