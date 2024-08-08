const Contact = require("./schemas/contact");

const getAllContacts = async (page = 1, limit = 20, filter = {}) => {
  const skip = (page - 1) * limit;
  return Contact.find(filter).skip(skip).limit(limit);
};

const getContactById = (id) => {
  return Contact.findOne({ _id: id });
};

const createContact = ({ name, email, phone }, userId) => {
  return Contact.create({ name, email, phone, owner: userId });
};

const removeContact = (id) => {
  return Contact.findByIdAndDelete({ _id: id });
};

const updateContact = (id, fields) => {
  return Contact.findByIdAndUpdate(
    { _id: id },
    { $set: fields },
    { new: true }
  );
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  removeContact,
  updateContact,
};
