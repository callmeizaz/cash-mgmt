const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  userType: { type: String },
  bills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bill" }],
});
module.exports = mongoose.model("user", userSchema);
