const service = require("../service");
const User = require("./schemas/userSchema");
const Joi = require("joi");

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

const register = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  const user = await User.findOne({ email });

  if (error) {
    return res.status(400).json({
      status: "400 Bad Request",
      contentType: "application/json",
      responseBody: "<Błąd z Joi lub innej biblioteki walidacji>",
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
    const result = await service.registerUser({ password, email });

    if (result) {
      const newUser = new User({ password, email });
      newUser.setPassword(password);
      await newUser.save();

      res.status(201).json({
        status: "201 Created",
        contentType: "application/json",
        responseBody: {
          user: {
            email: email,
            subscription: "starter",
          },
        },
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  register,
};
