const mongoose = require("mongoose");
const path = require("path");
const BILL_PATH = path.join("/uploads/users/bills");
const billSchema = new mongoose.Schema(
  {
    billDate: { type: Date },
    amount: { type: Number, required: true },
    billType: { type: String, required: true },
    actualExpense: { type: Boolean },
    billPath: { type: String },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    approved: { type: Boolean, default: false },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

// static
billSchema.statics.billPath = BILL_PATH;
module.exports = mongoose.model("bill", billSchema);
