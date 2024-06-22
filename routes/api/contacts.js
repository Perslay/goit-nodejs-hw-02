const contactsFunctions = require("../../models/contacts.js");

const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsFunctions.listContacts();
    res.json({
      status: 200,
      data: {
        contacts,
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contact = await contactsFunctions.getContactById(contactId);
    if (contact) {
      res.json({
        status: 200,
        data: {
          contact,
        },
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Not found",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
  // try {
  //   const contact = await contactsFunctions.addContact();
  // } catch (err) {
  //   console.error(err);
  //   next(err);
  // }
});

router.delete("/:contactId", async (req, res, next) => {
  // res.json({ message: "template message" });
  try {
    const contactId = req.params.contactId;
    const index = await contactsFunctions.removeContact(contactId);
    if (index !== -1) {
      res.json({
        status: 200,
        message: "contact deleted",
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Not found",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
