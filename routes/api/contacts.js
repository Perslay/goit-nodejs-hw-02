const Joi = require("joi");
// const contactsFunctions = require("../../models/contacts.js");
const ctrlContact = require("../../controller/contacts");

const express = require("express");
const router = express.Router();

// const schema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string()
//     .email({
//       minDomainSegments: 2,
//       tlds: { allow: ["com", "net"] },
//     })
//     .required(),
//   phone: Joi.number().integer().positive().required(),
// });

router.get("/", ctrlContact.get);
router.get("/:contactId", ctrlContact.getById);
router.post("/", ctrlContact.create);
router.put("/:contactId", ctrlContact.update);
router.delete("/:contactId", ctrlContact.remove);

module.exports = router;
