const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("./service/schemas/user");
require("dotenv").config();
const secret = process.env.AUTH_SECRET;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, function (payload, done) {
    User.find({ _id: payload.id })
      .then(([user]) => {
        if (!user) {
          return done(new Error("User not found"));
        }
        return done(null, user);
      })
      .catch((err) => done(err));
  })
);

// const jwt = require("jsonwebtoken");

// const payload = {
//   id: user.id, // user is not defined
//   username: user.username,
// };
// const secret = process.env.AUTH_SECRET;
// const token = jwt.sign(payload, secret, { expiresIn: "12h" });

// module.export = token;
