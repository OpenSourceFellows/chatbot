require('dotenv').config();
const { envValidation } = require('./../validations');
const logger = require('./logger');

let envVars;
let validationError;

try {
  const result = envValidation.validate(process.env);
  envVars = result.value;
  validationError = result.error;
} catch (error) {
  logger.error('Environment validation failed:', error);
  process.exit(1);
}

if (validationError) {
  logger.error('Environment validation errors:', validationError.details);
  process.exit(1);
}

module.exports = {
  // app config
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  appUrl: envVars.APP_URL,
  // db config
  postgresHost: envVars.POSTGRES_HOST,
  postgresPort: envVars.POSTGRES_PORT,
  postgresUser: envVars.POSTGRES_USER,
  postgresPassword: envVars.POSTGRES_PASSWORD,
  postgresDb: envVars.POSTGRES_DB,
  // auth0 config
  auth0Domain: envVars.AUTH0_DOMAIN,
  auth0ClientId: envVars.AUTH0_CLIENT_ID,
  auth0ClientService: envVars.AUTH0_CLIENT_SECRET,
  auth0Audience: envVars.AUTH0_AUDIENCE,
  auth0IssuerBaseUrl: envVars.AUTH0_ISSUER_BASE_URL,
  // twilio config
  twilioAccountSID: envVars.TWILIO_ACCOUNT_SID,
  twilioAuthToken: envVars.TWILIO_AUTH_TOKEN,
  twilioPhoneNumber: envVars.TWILIO_PHONE_NUMBER,
  // edx config
  edxApiKey: envVars.EDX_API_KEY,
  edxApiUrl: envVars.EDX_API_URL,
  edxClientId: envVars.EDX_CLIENT_ID,
  edxClientSecret: envVars.EDX_CLIENT_SECRET,
  aiApiKey: envVars.AI_API_KEY,
  aiModel: envVars.AI_MODEL,
};
