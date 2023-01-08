const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },
    address: { type: String },
    salary: { type: String },
    joiningDate: { type: Date },
    designation: { type: String },
    employeeId: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("employee", employeeSchema);
