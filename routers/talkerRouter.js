const router = require('express').Router();
const fs = require('fs');
const { OK_STATUS, NOT_FOUND } = require('../statusCode');

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

module.exports = router;