import express from 'express';
import passport from 'passport';

import User from '../database/models/user';

const router = express.Router({});

const userExists = async (email, username) => User.findOne({
  $or: [{ email }, { username }],
});

router.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;
  const userAlreadyExists = await userExists(email, username);
  console.log(userAlreadyExists);
  if (userAlreadyExists.email === email) {
    return res.status(409).send('email already exists');
  }

  const newUser = new User({ username, password, email });
  return newUser.save((newErr, savedUser) => {
    if (newErr) {
      return res.status(422).json(newErr);
    }
    return res.status(201).json(savedUser);
  });
});

router.get('/', (req, res) => {
  res.status(200).send('API is working');
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  const userInfo = {
    username: req.user.username,
  };
  res.send(userInfo);
});

module.exports = router;
