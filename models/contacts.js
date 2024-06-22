const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    console.error("Error reading contacts file in listContacts:", err);
  }
};

const getContactById = async (contactId) => {
  let contacts;
  try {
    const data = await fs.readFile(contactsPath);
    contacts = JSON.parse(data);
  } catch (err) {
    console.error("Error reading contacts file in getContactById:", err);
    return null;
  }

  const contact = contacts.filter((contact) => contact.id === contactId);
  if (contact.length === 0) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  let contacts;
  try {
    const data = await fs.readFile(contactsPath);
    contacts = JSON.parse(data);
  } catch (err) {
    console.error("Error reading contacts file in removeContact:", err);
    return null;
  }

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  contacts.splice(index, 1);

  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (err) {
    console.error("Error writing to contacts file in removeContact:", err);
    return null;
  }

  return contacts;
};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
