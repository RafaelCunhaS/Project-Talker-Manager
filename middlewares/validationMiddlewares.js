const { BAD_REQUEST } = require('../statusCode');

const validateEmail = (req, _res, next) => {
  const { email } = req.body;

  if (!email) next({ status: BAD_REQUEST, message: 'O campo "email" é obrigatório' });

  if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
    next({ status: BAD_REQUEST, message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const validatePassword = (req, _res, next) => {
  const { password } = req.body;

  if (!password) next({ status: BAD_REQUEST, message: 'O campo "password" é obrigatório' });

  if (password.length < 6) {
    next({ status: BAD_REQUEST, message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = { validateEmail, validatePassword };