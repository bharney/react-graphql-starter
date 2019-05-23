import passport from "passport";
let LocalStrategy = require("passport-local").Strategy;
import { User } from '../types/user/user.model'
import { AuthenticationError } from 'apollo-server'

passport.use("local", new LocalStrategy(
  function (email, password, done) {
    User.findOne({ email }, function (err, user) {
      if (err) {
        return err;
      }
      console.log(user)
      if (user == null) {
        return new AuthenticationError()
      }
      user.checkPassword(password)
        .then(same => {
          if (same) {
            return user;
          }
          return new AuthenticationError()
        })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    })
  }
));
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findOne({ id }).then((user, err) => {
    return done(err, user);
  });
});