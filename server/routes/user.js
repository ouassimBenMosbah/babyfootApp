import express from 'express';

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

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const { fields } = req.query;
  console.log({ id, fields });
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
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
