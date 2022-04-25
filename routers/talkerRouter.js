const router = require('express').Router();
const fs = require('fs');
const { OK_STATUS, NOT_FOUND, CREATED } = require('../statusCode');
const { 
  validateAuthorization, 
  validateName, validateAge,
  validateTalk, validateDateAndRate } = require('../middlewares/validationMiddlewares');

router.get('/', (_req, res) => {
  const result = fs.readFileSync('./talker.json');
  return res.status(OK_STATUS).json(JSON.parse(result));
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const talkers = JSON.parse(fs.readFileSync('./talker.json'));
  const result = talkers.find((talker) => talker.id === Number(id));

  if (!result) return next({ status: NOT_FOUND, message: 'Pessoa palestrante não encontrada' });
  
  return res.status(OK_STATUS).json(result);
});

router.post('/', validateAuthorization, validateName,
validateAge, validateTalk, validateDateAndRate, (req, res) => {
  const obj = req.body;
  const talkers = JSON.parse(fs.readFileSync('./talker.json'));

  const lastId = talkers[talkers.length - 1].id;

  const newTalker = { id: lastId + 1, ...obj };

  talkers.push(newTalker);

  fs.writeFileSync('./talker.json', JSON.stringify(talkers));
  return res.status(CREATED).json(newTalker);
});

module.exports = router;