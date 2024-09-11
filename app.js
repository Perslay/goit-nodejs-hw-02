const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const createError = require("http-errors");
const path = require("path");
const fs = require("fs").promises;
const multer = require("multer");
const tempDir = path.join(process.cwd(), "tmp");
const storeImage = path.join(process.cwd(), "public/avatars");
require("./passport");
require("dotenv").config();
const apiRouter = require("./routes/api/index");
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1048576,
  },
});

app.post("/upload", upload.single("picture"), async (req, res, next) => {
  const { description } = req.body;
  const { path: temporaryName, originalname } = req.file;
  const fileName = path.join(storeImage, originalname);
  try {
    await fs.rename(temporaryName, fileName);
  } catch (err) {
    await fs.unlink(temporaryName);
    return next(err);
  }
  res.json({ description, message: "Plik załadowany pomyślnie", status: 200 });
});

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message, status: err.status });
});

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

app.use((_, res, __) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, __) => {
  res.status(500).json({ message: err.message });
});

module.exports = {
  app,
  createFolderIsNotExist,
  tempDir,
  storeImage,
  upload,
};
