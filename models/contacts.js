// const fs = require('fs/promises')

const contacts = require("./contacts.json");

const listContacts = async () => {
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = contacts.filter((contact) => contact.id === contactId);
  if (contact.length !== 0) {
    return contact;
  } else {
    return null;
  }
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
