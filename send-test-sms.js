const twilio = require('twilio');
const { twilioAccountSID, twilioAuthToken, twilioPhoneNumber } = require('./src/config/config');

const client = twilio(twilioAccountSID, twilioAuthToken);

client.messages
  .create({
    body: 'Test Message: Abdullah, Project Earth, today is June 9th, time is 5:22 PM EST',
    from: twilioPhoneNumber,
    to: '+18777804236'
  })
  .then(message => {
    console.log('Message sent! SID:', message.sid);
  })
  .catch(error => {
    console.error('Error sending SMS:', error.message);
  });
