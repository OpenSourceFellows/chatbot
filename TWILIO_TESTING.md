# Twilio SMS Testing Guide

This guide walks you through how to safely test SMS functionality using Twilio, without committing scripts that send real messages.

## 📦 Prerequisites

* A Twilio account with a verified phone number
* Your Twilio credentials:
   * Account SID
   * Auth Token
   * Phone number (from Twilio)

Add these to your `.env` file like this:

```ini
TWILIO_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
```

## ✅ Safe Local Testing

Create a **temporary** Node.js script outside your repo directory to test SMS functionality.

⚠️ **Critical**: Create this file in a separate folder (not in your project repo) to prevent accidental commits.

Example (`../test-twilio.js`):

```javascript
import twilio from 'twilio';
import 'dotenv/config';

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

client.messages
  .create({
    body: 'Hello from Twilio!',
    from: process.env.TWILIO_PHONE_NUMBER,
    to: '+11234567890', // Replace with your own number
  })
  .then(message => console.log(`SMS sent! SID: ${message.sid}`))
  .catch(console.error);
```

To run the script:

```bash
node test-twilio.js
```

## 🔐 Important Notes

* **Never commit executable SMS scripts to the repository** - they pose security and cost risks
* Create test scripts in a separate directory outside your project repo
* Add `test-twilio.js` to `.gitignore` if you must keep it in the project folder
* Avoid sending unnecessary messages during testing — Twilio charges per SMS
* For structured testing, consider using Twilio's test credentials: https://www.twilio.com/docs/iam/test-credentials
* Delete test scripts after verification to prevent accidental execution by other developers