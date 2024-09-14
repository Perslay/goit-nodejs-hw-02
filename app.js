const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const createError = require("http-errors");
require("./passport");
require("dotenv").config();
const {
  upload,
  createFolderIfNotExist,
  tempDir,
  storeImage,
} = require("./middlewares/upload");
const apiRouter = require("./routes/api/index-routes");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

app.use(express.static(path.join(__dirname, "public")));

createFolderIfNotExist(tempDir);
createFolderIfNotExist(storeImage);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message, status: err.status });
});

module.exports = {
  app,
  createFolderIfNotExist,
  tempDir,
  storeImage,
  upload,
};
