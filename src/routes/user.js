import express from 'express';
import User from '../database/models/user';

const router = express.Router();
const passport = require('../passport');

router.post(
  '/login',
  (req, res, next) => {
    console.log('routes/user.js, login, req.body: ');
    console.log(req.body);
    next();
  },
  passport.authenticate('local'),
  (req, res) => {
    console.log('logged in', req.body.username);
    const userInfo = {
      username: req.user.username,
    };
    res.send(userInfo);
  },
);

router.get('/', (req, res) => {
  User.find({}).then((users) => {
    res.status(200).send(users);
  }).catch((err) => {
    res.status(401).send('An error occured', err);
  });
});

const arrayToObject = (array) => {
  const fields = array.forEach((field) => {
    fields[field] = 1;
    return fields;
  }, {});
  return fields;
};

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
