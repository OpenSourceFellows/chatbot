require('dotenv').config();
const { envValidation } = require('./../validations');
const logger = require('./logger');

const { value: envVars, error } = envValidation.validate(process.env);

if (error) {
  logger.error(error);
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
  edxClientId: envVars.EDX_API_URL,
  edxClientSecret: envVars.EDX_CLIENT_SECRET,
  aiApiKey: envVars.AI_API_KEY,
  aiModel: envVars.AI_MODEL,
  // dbConnection: envVars.DB_CONNECTION,

};
