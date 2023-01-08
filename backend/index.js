const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();

app.use(cors());

const port = 8000;

require("./config/mongoose");

require("path");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", require("./routes"));
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});
