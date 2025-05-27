const joi = require('joi');

const envVarSchema = joi
  .object({
    // App Configuration
    NODE_ENV: joi.string().valid('development', 'production', 'test').default('development'),
    PORT: joi.number().positive().default(3000),
    APP_URL: joi.string().uri().required(),

    // Database
    POSTGRES_HOST: joi.string().hostname().required(),
    POSTGRES_PORT: joi.number().positive().default(5432),
    POSTGRES_USER: joi.string().required(),
    POSTGRES_PASSWORD: joi.string().required(),
    POSTGRES_DB: joi.string().required(),

    // Auth0 Configuration
    AUTH0_DOMAIN: joi.string().required(),
    AUTH0_CLIENT_ID: joi.string().required(),
    AUTH0_CLIENT_SECRET: joi.string().required(),
    AUTH0_AUDIENCE: joi.string().required(),
    AUTH0_ISSUER_BASE_URL: joi.string().uri().required(),

    // Twilio Configuration
    TWILIO_ACCOUNT_SID: joi.string().required(),
    TWILIO_AUTH_TOKEN: joi.string().required(),
    TWILIO_PHONE_NUMBER: joi.string().required(),

    // EdX API
    EDX_API_KEY: joi.string().required(),
    EDX_API_URL: joi.string().uri().required(),
    EDX_CLIENT_ID: joi.string().required(),
    EDX_CLIENT_SECRET: joi.string().required(),

    // AI Service
    AI_API_KEY: joi.string().required(),
    AI_MODEL: joi.string().default('gpt-4')
  })
  .unknown();

module.exports = envVarSchema;