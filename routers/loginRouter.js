const router = require('express').Router();
const crypto = require('crypto');
const { OK_STATUS } = require('../statusCode');
const { validateEmail, validatePassword } = require('../middlewares/validationMiddlewares');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

router.post('/', validateEmail, validatePassword, (_req, res) => {
  res.status(OK_STATUS).json({ token: generateToken() });
});

module.exports = router;