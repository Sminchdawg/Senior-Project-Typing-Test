const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const { response } = require('express');

const User = mongoose.model('User');
const Result = mongoose.model('Result');

module.exports.register = (req, response, next) => {
  const user = new User();
  user.fullName = req.body.fullName;
  user.email = req.body.email;
  user.password = req.body.password;
  user.save((error, doc) => {
    if (!error) {
      response.send(doc);
    } else {
      if (error.code === 11000) {
        response.status(422).send(['Duplicate email address found.']);
      } else {
        return next(error);
      }
    }
  });
}

module.exports.results = (req, response, next) => {
  const result = new Result();
  result.wpm = req.body.wpm;
  result.correctWords = req.body.correctWords;
  result.incorrectWords = req.body.incorrectWords;
  result.userId = req.body.userId;

  result.save((error, doc) => {
    if (!error) {
      response.send(doc);
    } else {
      console.log(error);
      return next(error);
    }
  })
}

module.exports.userResults = (req, res, next) => {
  Result.find({ userId: req.params.userId },
    (error, result) => {
      if (!result) {
        return res.status(404).json({ status: false, message: 'User does not have any results'});
      }

      return res.status(200).json({ status: true, results: result});
    })
}

module.exports.authenticate = (req, res, next) => {
  // Call for passport authentication
  passport.authenticate('local', (error, user, info) => {
    // Error from passport middleware
    if (error) {
      return res.status(400).json(error);
    }
    // Registered user
    if (user) {
      return res.status(200).json({ "token": user.generateJwt(), "id": user.id });
    }
    // Unknown user or wrong password
    return res.status(404).json(info);
  })(req, res);
}

module.exports.userProfile = (req, res, next) => {
  User.findOne({ _id: req._id }, 
    (error, user) => {
      if (!user) {
        return res.status(404).json({ status: false, message: 'User record not found.' });
      }

      return res.status(200).json({ status: true, user: _.pick(user, ['fullName', 'email']) });
    });
}
