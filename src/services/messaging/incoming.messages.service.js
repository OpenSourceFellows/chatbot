const twilioClient = require('../../config/twilio')

const SOURCES = {
  TWILIO: 'twilio',
  OPENEDX: 'openedx'
}

async function handleIncomingMessage(req, res, next) {
  const startTime = Date.now()
  const requestId = req.headers['x-request-id'] || `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

  try {
    logger.info('Webhook request received', {
      requestId,
      source: req.headers['user-agent'],
      contentType: req.headers['content-type'],
      bodySize: req.rawBody.length,
      timestamp: new Date().toISOString()
    })

    const result = await processMessage(req, requestId)
  } catch (error) { 
    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
      success: false,
      requestId,
      error: error.message,
      code: error.code || 'WEBHOOK_ERROR'
    })
  }
}


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

    // TODO: send to appropriate handler
  } else if (source === SOURCES.OPENEDX) {
    // TODO: Ascertain logic for validating OpenedX 
  }
}

function identifySource(req) {
  const userAgent = req.headers['user-agent'] || ''
  const twilioSignature = req.headers['x-twilio-signature']

  if (twilioSignature || userAgent.includes('TwilioProxy')) {
    return SOURCES.TWILIO
  }

  throw new Error("Could not identify source");
}