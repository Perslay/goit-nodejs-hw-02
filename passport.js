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
    // console.log("JWT payload:", payload);
    User.findById(payload.id)
      .then((user) => {
        if (!user) {
          // console.error("User not found:", payload.id);
          return done(null, false, { message: "User not found" });
        }
        // console.log("User found:", user);
        return done(null, user);
      })
      .catch((err) => {
        // console.error("Error finding user:", err);
        return done(err, false);
      });
  })
);

module.exports = passport;
