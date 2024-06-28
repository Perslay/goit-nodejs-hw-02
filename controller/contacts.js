const service = require("../service");

const get = async (req, res, next) => {
  try {
    const results = await service.getAllContacts();
    res.json({
      status: 200,
      data: { contacts: results },
    });
  } catch (err) {
    console.error("Error getting contacts list:", err);
    next(err);
  }
};

const getById = async (req, res, next) => {
  const id = req.params.contactId;

  try {
    const result = await service.getContactById(id);
    if (result) {
      res.json({
        status: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Not found",
      });
    }
  } catch (err) {
    console.error("Error getting contact:", err);
    next(err);
  }
};

const remove = async (req, res, next) => {
  const id = req.params.contactId;

  try {
    const result = await service.removeContact(id);
    if (result) {
      res.json({
        status: 200,
        message: "Contact deleted",
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Not found",
      });
    }
  } catch (err) {
    console.error("Error removing contact:", err);
    next(err);
  }
};

const create = async (req, res, next) => {
  const { name, email, phone } = req.body;

  try {
    const result = await service.createContact({ name, email, phone });
    res.status(201).json({
      status: 201,
      data: { newContact: result },
    });
  } catch (err) {
    console.error("Error creating contact:", err);
    next(err);
  }
};

const update = async (req, res, next) => {
  const id = req.params.contactId;
  const { name, email, phone } = req.body;

  try {
    const result = await service.updateContact(id, { name, email, phone });
    if (result) {
      res.json({
        status: 200,
        data: { newContact: result },
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Not found",
      });
    }
  } catch (err) {
    console.error("Error updating contact:", err);
    next(err);
  }
};

const updateStatus = async (req, res, next) => {
  const id = req.params.contactId;
  const { favorite = false } = req.body;

  try {
    const result = await service.updateContact(id, { favorite });
    if (result) {
      res.json({
        status: 200,
        data: { updatedContact: result },
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Not found",
      });
    }
  } catch (err) {
    console.error("Error updating favorite status in contact:", err);
    next(err);
  }
};

module.exports = {
  get,
  getById,
  remove,
  create,
  update,
  updateStatus,
};
