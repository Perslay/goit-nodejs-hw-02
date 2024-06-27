const ctrlContact = require("../../controller/contacts");

const express = require("express");
const router = express.Router();

router.get("/", ctrlContact.get);
router.get("/:contactId", ctrlContact.getById);
router.post("/", ctrlContact.create);
router.put("/:contactId", ctrlContact.update);
router.delete("/:contactId", ctrlContact.remove);

module.exports = router;
