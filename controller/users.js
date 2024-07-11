const service = require("../service");
const User = require("../service/schemas/user");
const Joi = require("joi");
// const token = require("../passport");
const passport = require("../passport");
const jwt = require("jsonwebtoken");

const schema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    // UNIQUE EMAIL
    // .external(async (email) => {
    //   // You have to create `checkEmailInUse` funciton somewhere in your code and call it here
    //   const isEmailInUse = await checkEmailInUse(email);
    //   if (isEmailInUse) {
    //     throw new Error("email in use");
    //   }
    //   return email;
    // })
    .required(),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
  token: Joi.string().default(null),
});

const auth = (req, res, next) => {
  passport.authenticate;
};

const register = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  const user = await User.findOne({ email: req.body.email });
  // const user = await User.findOne({ email }, { _id });

  if (error) {
    return res.status(400).json({
      status: "400 Bad Request",
      contentType: "application/json",
      responseBody: error.message,
    });
  }

  if (user) {
    return res.status(409).json({
      status: "409 Conflict",
      contentType: "application/json",
      responseBody: {
        message: "Email in use",
      },
    });
  }

  try {
    // const result = await service.registerUser(req.body);

    // if (result) {
    const newUser = new User({
      // password: req.body.password,
      email: req.body.email,
    });
    await newUser.setPassword(req.body.password);
    await newUser.save();

    res.status(201).json({
      status: "201 Created",
      contentType: "application/json",
      responseBody: {
        user: {
          email: req.body.email,
          subscription: "starter",
        },
      },
    });
    // }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const login = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  // const user = await User.findOne({ email }, { _id });
  // console.log('Email:', req.body.email);
  // console.log('Email:', {email});

  if (error) {
    return res.status(400).json({
      status: "400 Bad Request",
      contentType: "application/json",
      responseBody: error.message,
    });
  }

  const user = await User.findOne({ email: req.body.email });
  // console.log("user:", user);

  if (!user) {
    return res.status(401).json({
      status: "401 Unauthorized",
      responseBody: {
        message: "User with this email doesn't exist",
      },
    });
  }

  const isPasswordValid = await user.validatePassword(req.body.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      status: "401 Unauthorized",
      responseBody: {
        message: "Incorrect password",
      },
    });
  }

  try {
    const payload = {
      id: user._id,
      username: user.username,
    };
    const secret = process.env.AUTH_SECRET;
    const token = jwt.sign(payload, secret, { expiresIn: "12h" });

    // const data = await service.logUserIn(req.body, token);

    // if (data.result) {
    return res.json({
      status: "200 OK",
      contentType: "application/json",
      responseBody: {
        token: token,
        user: {
          email: req.body.email,
          subscription: "starter",
        },
      },
    });
    // }

    res.status(500).json({
      status: "500 Internal Server Error",
      responseBody: {
        token: token,
        responseBody: {
          message: "Failed to log user in",
        },
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  register,
  login,
};
