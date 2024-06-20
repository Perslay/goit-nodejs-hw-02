const contactsFunctions = require("../../models/contacts.js");

const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsFunctions.listContacts();
    res.json({
      status: "success",
      code: 200,
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
        status: "success",
        code: 200,
        data: {
          contact,
        },
        type: typeof contact,
      });
    } else {
      res.status(404).json({
        status: "failure",
        code: 404,
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
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
