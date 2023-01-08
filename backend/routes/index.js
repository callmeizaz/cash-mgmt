const express = require("express");
const auth = require("../middleware/jwtAuth");

const router = express.Router();
router.get("/", auth, (req, res) => {
  res.send("Hello world");
});
router.use("/users", require("./user"));
router.use("/bills", require("./bill"));
router.use("/employees", require("./employee"));

module.exports = router;
