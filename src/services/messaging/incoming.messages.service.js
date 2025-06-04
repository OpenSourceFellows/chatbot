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

  try {
    source = identifySource(req)
  } catch (error) {
    throw new Error("Could not validate message authenticity");
  }

  if (source === SOURCES.TWILIO) {
    verifyTwilioSignature(req)

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

function verifyAuthenticity(req, source) {
  switch (source) {
    case SOURCES.TWILIO: 
      return verifyTwilioSignature(req)
    default:
      throw new Error("Could not identify source")
  }
}

function verifyTwilioSignature(req) {
  const twilioSignature = req.headers['x-twilio-signature']
  const authToken = process.env.TWILIO_AUTH_TOKEN

  if (!twilioSignature || !authToken) {
    throw new Error('Missing Twilio signature or auth token')
  }

  // TODO: Determine strategy for validating twilio signature against auth token
}