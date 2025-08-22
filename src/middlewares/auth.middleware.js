const { auth } = require('express-oauth2-jwt-bearer');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

// Auth0 JWT validation middleware
const checkJwt = auth({
  audience: config.auth0Audience,
  issuerBaseURL: config.auth0IssuerBaseUrl,
  tokenSigningAlg: 'RS256'
});

// Optional authentication middleware
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    req.user = null;
    return next();
  }

  checkJwt(req, res, (err) => {
    if (err) {
      req.user = null;
      return next();
    }
    next();
  });
};

// Required authentication middleware
const requireAuth = (req, res, next) => {
  checkJwt(req, res, (err) => {
    if (err) {
      return next(new ApiError(httpStatus.UNAUTHORIZED, 'Authentication required'));
    }
    next();
  });
};

module.exports = {
  checkJwt,
  optionalAuth,
  requireAuth
};
