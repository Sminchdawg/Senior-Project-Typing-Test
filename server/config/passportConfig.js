const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

let User = mongoose.model('User');

passport.use(
  new localStrategy({ usernameField: 'email' },
    (username, password, done) => {
      User.findOne({ email: username }, 
        (error, user) => {
          if (error) {
            return done(error);
          }
          // Unknown User
          if (!user) {
            return done(null, false, { message: 'Email is not registered' });
          }
          // Wrong password
          if (!user.verifyPassword(password)) {
            return done(null, false, { message: 'Wrong password.' });
          }
          // Authentication succeeded
          return done(null, user);
        });
    })
);