const express = require("express");
const router = express.Router();

const userRoutes = require("./users-routes");
const contactRoutes = require("./contacts-routes");

router.use("/users", userRoutes);
router.use("/contacts", contactRoutes);

module.exports = router;
