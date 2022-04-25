const router = require('express').Router();
const fs = require('fs');
const { OK_STATUS, NOT_FOUND, CREATED, NO_CONTENT } = require('../statusCode');
const { 
  validateAuthorization, 
  validateName, validateAge,
  validateTalk, validateDateAndRate } = require('../middlewares/validationMiddlewares');

const TALKER_PATH = './talker.json';

router.get('/', (_req, res) => {
  const result = fs.readFileSync(TALKER_PATH);
  return res.status(OK_STATUS).json(JSON.parse(result));
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const talkers = JSON.parse(fs.readFileSync(TALKER_PATH));
  const result = talkers.find((talker) => talker.id === Number(id));

  if (!result) return next({ status: NOT_FOUND, message: 'Pessoa palestrante não encontrada' });
  
  return res.status(OK_STATUS).json(result);
});

router.post('/', validateAuthorization, validateName,
validateAge, validateTalk, validateDateAndRate, (req, res) => {
  const obj = req.body;
  const talkers = JSON.parse(fs.readFileSync(TALKER_PATH));

  const highestId = Math.max(...talkers.map((talker) => talker.id));

  const newTalker = { id: highestId + 1, ...obj };

  talkers.push(newTalker);

  fs.writeFileSync(TALKER_PATH, JSON.stringify(talkers));
  return res.status(CREATED).json(newTalker);
});

router.put('/:id', validateAuthorization, validateName,
validateAge, validateTalk, validateDateAndRate, (req, res) => {
  const { id } = req.params;
  const obj = req.body;
  const talkers = JSON.parse(fs.readFileSync(TALKER_PATH));

  const filtered = talkers.filter((talker) => talker.id !== Number(id));

  const newTalker = { id: Number(id), ...obj };
  filtered.push(newTalker);
  
  fs.writeFileSync(TALKER_PATH, JSON.stringify(filtered));
  return res.status(OK_STATUS).json(newTalker);
});

router.delete('/:id', validateAuthorization, (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(fs.readFileSync(TALKER_PATH));

  const deleted = talkers.filter((talker) => talker.id !== Number(id));
  
  fs.writeFileSync(TALKER_PATH, JSON.stringify(deleted));
  return res.status(NO_CONTENT).end();
});

module.exports = router;