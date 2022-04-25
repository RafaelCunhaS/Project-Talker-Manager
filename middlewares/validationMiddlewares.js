const { BAD_REQUEST, UNAUTHORIZED } = require('../statusCode');

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

const validateAuthorization = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) next({ status: UNAUTHORIZED, message: 'Token não encontrado' });

  if (authorization.length !== 16) {
    next({ status: UNAUTHORIZED, message: 'Token inválido' });
  }

  next();
};

const validateName = (req, _res, next) => {
  const { name } = req.body;

  if (!name) next({ status: BAD_REQUEST, message: 'O campo "name" é obrigatório' });

  if (name.length < 3) {
    next({ status: BAD_REQUEST, message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = (req, _res, next) => {
  const { age } = req.body;

  if (!age) next({ status: BAD_REQUEST, message: 'O campo "age" é obrigatório' });

  if (age < 18) {
    next({ status: BAD_REQUEST, message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validateTalk = (req, _res, next) => {
  const { talk } = req.body;
  const error = { status: BAD_REQUEST, 
    message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' };
  
  if (!talk) {
    next(error);
  }

  const { talk: { watchedAt, rate } } = req.body;

  if (!watchedAt || !rate) {
    next(error);
  }

  next();
};

const validateDateAndRate = (req, _res, next) => {
  const { talk: { watchedAt, rate } } = req.body;

  if (!watchedAt.match(/[0-9]{2}[/][0-9]{2}[/][0-9]{4}$/)) {
    next({ status: BAD_REQUEST, message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (rate < 1 || rate > 5) {
    next({ status: BAD_REQUEST, message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = { 
  validateEmail, 
  validatePassword, 
  validateAuthorization,
  validateName, 
  validateAge, 
  validateTalk, 
  validateDateAndRate };