const Contact = require("./schemas/contactSchema");
const User = require("./schemas/userSchema");

const getAllContacts = async () => {
  return Contact.find();
};

const getContactById = (id) => {
  return Contact.findOne({ _id: id });
};

const createContact = ({ name, email, phone }) => {
  return Contact.create({ name, email, phone });
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

const registerUser = ({ password, email }) => {
  return User.create({ password, email });
};

const logUserIn = ({ email }, user) => {
  const payload = {
    id: user.id,
    username: user.username,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });

  const filter = { email: email };
  const update = { token: token };
  const result = User.findOneAndUpdate(filter, update, {
    new: true,
  });

  const data = {
    result: result,
    token: token,
  };
  return data;
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  removeContact,
  updateContact,
  registerUser,
  logUserIn,
};
