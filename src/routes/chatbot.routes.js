const express = require('express');

const router = express.Router();

router.post('/message', (req,res) =>{
  const { message } = req.body;

  res.json({
    reply: `Chatbot received your message: "${message}"`
  });
});

module.exports = router;