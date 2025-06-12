const twilioClient = require('../../config/twilio')
const SOURCES = require('../../utils/constants')


async function processMessage(req, requestId) {
  let source = identifySource(req)

  if (source === SOURCES.TWILIO) {
    twilioClient.webhook()(req)

    logger.info("Received Twilio Message", {
      requestId,
      source,
      body: req.body.Body,
      from: req.body.From,
    })

    // TODO: send to appropriate Twilio handler
  } else if (source === SOURCES.OPENEDX) {
    // TODO: send to appropriate OpenEdx handler
  }
}

function identifySource(req) {
  const userAgent = req.headers['user-agent'] || ''
  const twilioSignature = req.headers['x-twilio-signature']

  if (twilioSignature || userAgent.includes('TwilioProxy')) {
    return SOURCES.TWILIO
  }

  // TODO: identify strategy for validating openedx webhook requests
  // https://github.com/OpenSourceFellows/chatbot/issues/23

  throw new Error("Could not identify source");
}

module.exports = {
  processMessage
}