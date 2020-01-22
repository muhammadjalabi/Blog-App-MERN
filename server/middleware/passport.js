const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

const User = require('../models/User');
const config = require('../config/key');

const SECRET = config.SECRET

const opts = {}
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET;

module.exports = passport => {
  passport.use(
    new JWTStrategy(opts, (jwt_payload, done) => {
      User.findOne({ _id: jwt_payload.id }).then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
        .catch(error => console.log({ error: 'error authenticating the user' }, error))
    })
  );
};
