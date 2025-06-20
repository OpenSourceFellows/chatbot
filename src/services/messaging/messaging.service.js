const logger = require('../../config/logger');
const twilioClient = require('../../config/twilio');
const SOURCES = require('../../utils/constants');

/**
 * 
 * @param {Express.Request} req 
 * @param {string} requestId 
 */
function processMessage(req, requestId) {
  const source = identifySource(req);

  if (source === SOURCES.TWILIO) {
    twilioClient.webhook()(req);

    logger.info('Received Twilio Message', {
      requestId,
      source,
      body: req.body.Body,
      from: req.body.From,
    });

    // TODO: send to appropriate Twilio handler
  } else if (source === SOURCES.OPENEDX) {

    logger.info('Received Openedx Notification', {
      requestId,
      source,
    });
    // TODO: send to appropriate OpenEdx handler
  }
}

function identifySource(req) {
  const userAgent = req.headers['user-agent'] || '';
  const twilioSignature = req.headers['x-twilio-signature'];

  if (twilioSignature || userAgent.includes('TwilioProxy')) {
    return SOURCES.TWILIO;
  } else if (req.query.source.toLowerCase() === 'openedx') {
    return SOURCES.OPENEDX;
  }

  // TODO: identify strategy for validating openedx webhook requests
  // https://github.com/OpenSourceFellows/chatbot/issues/23

  throw new Error('Could not identify source');
}

module.exports = {
  processMessage
};