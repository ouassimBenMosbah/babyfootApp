import Strategy from 'passport-local';

import User from '../database/models/user';

const strategy = new Strategy({
  usernameField: 'username',
}, ((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      if (!user.isValidPassword(password)) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    });
  }));

module.exports = strategy;
