const mongoose = require("mongoose");
const app = require("./app");

const MAIN_PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_URL;

const connection = mongoose.connect(uriDb);

connection
  .then(() => {
    app.app.listen(MAIN_PORT, async function () {
      try {
        app.createFolderIfNotExist(app.tempDir);
        app.createFolderIfNotExist(app.storeImage);
        console.log("Folders checked/created successfully");
      } catch (err) {
        console.error("Error creating folders", err.message);
      }
      console.log("Database connection successful");
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
