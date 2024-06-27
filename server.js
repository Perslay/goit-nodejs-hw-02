const mongoose = require("mongoose");
const app = require("./app");

const MAIN_PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_URL;

const connection = mongoose.connect(uriDb, {
  useUnifiedTopology: true,
  useFindAndModify: false,
});

connection
  .then(() => {
    app.listen(MAIN_PORT, function () {
      // console.log(`Server running. Use our API on port: ${MAIN_PORT}`);
      console.log("Database connection successful");
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })
