const router = require('express').Router();
const fs = require('fs');
const { OK_STATUS } = require('../statusCode');

router.get('/', (_req, res) => {
  const result = fs.readFileSync('./talker.json');
  return res.status(OK_STATUS).json(JSON.parse(result));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const talkers = JSON.parse(fs.readFileSync('./talker.json'));
  const result = talkers.find((talker) => talker.id === Number(id));
  return res.status(OK_STATUS).json(result);
});

module.exports = router;