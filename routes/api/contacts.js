// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }

const contactsFunctions = require("../../models/contacts.js");
// const contacts = require("../../models/contacts.json");
// console.log(contacts);

const express = require("express");

const router = express.Router();

router.get("/api/contacts", async (req, res, next) => {
  // niczego nie otrzymuje
  // wywołuje funkcję listContacts do pracy z plikiem json contacts.json
  // zwraca tablicę wszystkich kontaktów w formacie json ze statusem 200
  // res.json({ message: "template message" });
  try {
    const contacts = await contactsFunctions.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
