const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;

const tempDir = path.join(__dirname, "..", "tmp");
const storeImage = path.join(__dirname, "..", "public/avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Setting destination for file upload:", tempDir);
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    console.log("Setting filename for file upload:", file.originalname);
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1048576,
  },
});

const createFolderIfNotExist = async (folder) => {
  try {
    await fs.access(folder);
  } catch {
    console.log("Creating folder:", folder);
    await fs.mkdir(folder);
  }
};

module.exports = {
  upload,
  createFolderIfNotExist,
  tempDir,
  storeImage,
};
