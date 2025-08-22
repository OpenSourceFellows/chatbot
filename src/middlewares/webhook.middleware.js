const express = require('express');

// Middleware to capture raw body for webhook verification
const rawBodyMiddleware = express.raw({ type: 'application/json' });

// Middleware to handle webhook requests
const webhookMiddleware = (req, res, next) => {
  // Store raw body for signature verification
  req.rawBody = req.body;
  
  // Add webhook-specific headers
  req.isWebhook = true;
  
  next();
};

module.exports = {
  rawBodyMiddleware,
  webhookMiddleware
};
