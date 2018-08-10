import express from 'express';
import passport from 'passport';

import User from '../database/models/user';

const router = express.Router({});

const isUsernameUsed = async username => await User.findOne({ username }) !== null;

router.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;
  const usernameExists = await isUsernameUsed(username);
  if (usernameExists) {
    return res.status(409).send('User with provided username already exists');
  }

  const newUser = new User({ username, password, email });
  return newUser.save((newErr, savedUser) => {
    if (newErr) { return res.status(422).json(newErr); }
    return res.status(201).json(savedUser);
  });
});

router.get('/', (req, res) => {
  res.status(200).send();
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  const userInfo = {
    username: req.user.username,
  };
  res.send(userInfo);
});

module.exports = router;
