const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = require('./config')
module.exports = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
