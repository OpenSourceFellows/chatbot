const express = require('express');

const router = express.Router();

router.get('/courses', (req, res) => {
  res.json({ courses: ['Intro to AI ', 'Intro to Java'] });
});

module.exports = router;