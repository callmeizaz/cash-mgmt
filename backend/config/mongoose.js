const mongoose = require("mongoose");
const name = "octalogicBillMgmtDb";

mongoose.connect(`mongodb://localhost/${name}`);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function () {
  console.log(`Connected to Database :: ${name}`);
});

module.exports = db;
