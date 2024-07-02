const service = require("../service");
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
  owner: Joi.string().alphanum(),
});

const register = async (req, res, next) => {};

module.exports = {
  register,
};
