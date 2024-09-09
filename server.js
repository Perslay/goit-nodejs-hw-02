// const express = require("express");
// const logger = require("morgan");
// const cors = require("cors");
// const createError = require("http-errors");
// const path = require("path");
// const fs = require("fs").promises;
// const multer = require("multer");
// const tempDir = path.join(process.cwd(), "tmp");
// const storeImage = path.join(process.cwd(), "public/avatars");
// require("./passport");
// require("dotenv").config();
// const apiRouter = require("./routes/api/index");
// const app = express();

const mongoose = require("mongoose");
const app = require("./app");

const MAIN_PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_URL;

const connection = mongoose.connect(uriDb);

connection
  .then(() => {
    app.app.listen(MAIN_PORT, async function () {
      app.createFolderIsNotExist(app.tempDir);
      app.createFolderIsNotExist(app.storeImage);
      console.log("Database connection successful");
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
