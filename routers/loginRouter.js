const router = require('express').Router();
const crypto = require('crypto');
const { OK_STATUS, BAD_REQUEST } = require('../statusCode');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

router.post('/', (req, res) => {
  const { email, password } = req.body;
  return res.status(OK_STATUS).json({ token: generateToken() });
});

module.exports = router;