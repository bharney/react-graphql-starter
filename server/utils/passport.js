import passport from 'passport';
import config from '../config'

const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const verifyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secrets.jwt,
  audience: 'inspector.com',
  algorithms: ['HS256']
};

passport.use(
  new JwtStrategy(verifyOptions, (payload, done) => done(null, payload))
);

exports.authenticate = (req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate('jwt', (err, payload) => {
      if (err) reject(err);
      resolve(payload);
    })(req, res);
  });