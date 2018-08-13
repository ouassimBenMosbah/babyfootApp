import express from 'express';
import User from '../database/models/user';

const router = express.Router();
const passport = require('../passport');

const arrayToObject = (array) => {
  const fields = {};
  array.forEach((field) => {
    fields[field] = 1;
    return fields;
  }, {});
  return fields;
};

router.get('/', async (req, res) => {
  const { range } = req.query;
  const [rangeStart, rangeEnd] = range ? range.split('-') : [null, null];
  const { fields } = req.query;

  let dict = {};

  if (fields) {
    dict = arrayToObject(fields.split(','));
    console.log(dict);
  }
  const users = await User.find()
    .skip(+rangeStart)
    .limit(+rangeEnd)
    .select(dict);
  if (users) {
    res.send(users);
  } else {
    res.status(404).send('User not found');
  }
  // return res.status(200).json(users);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { fields } = req.query;
  let dict = {};

  if (fields) {
    dict = arrayToObject(fields.split(','));
  }

  const user = await User.findById(id).select(dict);

  if (user) {
    res.send(user);
  } else {
    res.status(404).send('User not found');
  }
});

router.post('/logout', (req, res) => {
  if (req.user) {
    req.logout();
    res.send({ msg: 'logging out' });
  } else {
    res.send({ msg: 'no user to log out' });
  }
});

module.exports = router;
