require('dotenv').config();
const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

client.messages
  .create({
    body: 'Test Message: Abdullah, Project Earth, today is June 9th, time is 5:22 PM EST',
    from: process.env.TWILIO_PHONE_NUMBER,
    to: '+18777804236'
  })
  .then(message => {
    console.log('Message sent! SID:', message.sid);
  })
  .catch(error => {
    console.error('Error sending SMS:', error.message);
  });
