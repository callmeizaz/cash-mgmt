const path = require("path");
const fs = require("fs");
const archiver = require("archiver");
const Bill = require("../models/Bill");
const User = require("../models/User");
const Employee = require("../models/Employee");

const moment = require("moment");

var json2xls = require("json2xls");
const { GenerateBill } = require("../utils/helperFunction");

const makeXlsheet = (bills, filename) => {
  let data = [];
  for (let bill of bills) {
    let reqBill = {
      "Bill Date": bill.billDate,
      Amount: bill.amount,
      "Bill Type": bill.billType,
      "Actual Expense": bill.actualExpense,
      "Uploaded By": bill.uploadedBy,
      "Submitted By": bill.submittedBy,
      Approved: bill.approved,
      "Approved By": bill.approvedBy,
    };
    data.push(reqBill);
  }
  var xls = json2xls(data);

  fs.writeFileSync(filename, xls, "binary", (err) => {
    if (err) {
      console.log("writeFileSync :", err);
    }
  });
};

const archiveMaker = async (bills, xlpath, res, downloadImages) => {
  const output = fs.createWriteStream(
    path.join(__dirname, "..", "rarOutput") + "/Exported Data.zip"
  );
  const archive = archiver("zip", {
    zlib: { level: 9 },
  });
  output.on("end", function () {
    console.log("Data has been drained");
  });

  archive.on("error", function (err) {
    throw err;
  });

  archive.pipe(output);

  if (downloadImages == true) {
    for (let bill of bills) {
      let billName = bill.billPath.split("/");
      billName = billName[billName.length - 1];
      const file1 = path.join(__dirname, "..", bill.billPath);
      archive.append(fs.createReadStream(file1), { name: "bills/" + billName });
    }
  }

  archive.append(fs.createReadStream(xlpath), { name: "Datasheet.xlsx" });
  output.on("close", function () {
    res.download(output.path, function (err) {
      if (err) {
        console.log(err);
      } else {
        fs.unlinkSync(output.path);
        fs.unlinkSync(xlpath);
      }
    });
  });

  archive.finalize();
  return output.path;
};

module.exports.addBill = async (req, res) => {
  let billPath = "";
  try {
    const submittedByUser = req.user;
    console.log(req.user);
    const { amount, billType, actualExpense, uploadedBy, billDate } = req.body;

    console.log(req.body);
    let submittedBy = await User.findOne({ email: submittedByUser });
    let submittedById = submittedBy.id;

    let uploadedById = await Employee.findOne({ email: uploadedBy });
    console.log(uploadedById);
    uploadedById = uploadedById.id;

    let approved = false;

    if (req.file) {
      console.log(Bill.billPath);
      billPath = Bill.billPath + "/" + req.file.filename;
    }

    let createdBill = await Bill.create({
      amount,
      billType,
      actualExpense,
      uploadedBy: uploadedById,
      billPath,
      billDate,
      submittedBy: submittedById,
      approved,
    });

    // let uploadedByUser = await User.findById(uploadedById);
    // uploadedByUser.bills.push(createdBill);
    // uploadedByUser.save();

    return res.status(200).send({
      message: "Bill created successfully",
      data: createdBill,
    });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .send({ error: error.message, message: "Some error occurred" });
  }
};

module.exports.deleteBill = async (req, res) => {
  try {
    let idToBeDeleted = req.params.id;

    const billToBeDeleted = await Bill.findById({
      _id: idToBeDeleted,
    }).populate("uploadedBy", { password: 0 });

    if (billToBeDeleted.billPath) {
      fs.unlinkSync(path.join(__dirname, "..", billToBeDeleted.billPath));
    }

    let user = await User.findById(billToBeDeleted.uploadedBy);
    console.log("this is the user", user);
    user.bills.pull(idToBeDeleted);
    user.save();

    const deletedBill = await Bill.findByIdAndDelete({
      _id: idToBeDeleted,
    });

    return res.status(200).send({
      message: "Bill deleted successfully",
      data: deletedBill,
    });
  } catch (error) {
    res
      .status(500)
      .send({ error: error.message, message: "Some error occurred" });
  }
};

module.exports.updateBill = async (req, res) => {
  let billPath = "";
  try {
    let idToBeUpdated = req.params.id;
    let dataToBeUpdated = req.body;

    let billToBeUpdated = await Bill.findById(idToBeUpdated);

    if (req.file) {
      if (billToBeUpdated.billPath) {
        fs.unlinkSync(path.join(__dirname, "..", billToBeUpdated.billPath));
      }
      billPath = Bill.billPath + "/" + req.file.filename;
      dataToBeUpdated["billPath"] = billPath;
    }
    const updatedBill = await Bill.updateOne(
      { _id: idToBeUpdated },
      dataToBeUpdated
    );
    res.status(200).send({
      message: "Bill Updated Successfully",
      data: updatedBill,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: error.message, message: "Some error occurred" });
  }
};

module.exports.getBillById = async (req, res) => {
  try {
    let idToFetch = req.params.id;

    let bill = await Bill.findById(
      { _id: idToFetch },
      {
        billPath: 0,
      }
    ).populate("uploadedBy submittedBy approvedBy", {
      password: 0,
      bills: 0,
    });

    res.status(500).send({
      message: "Bill Fetched Successfully",
      data: bill,
    });
  } catch (error) {
    res
      .status(500)
      .send({ error: error.message, message: "Some error occurred" });
  }
};

module.exports.getMultipleBills = async (req, res) => {
  try {
    const data = await Bill.find({})
      .limit(req.query.limit * 1)
      .skip((req.query.page - 1) * req.query.limit);

    res.status(200).send({
      data: data,
      message: "All required bills fetched successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error in fetching bills",
      error: error.message,
    });
  }
};

module.exports.approveBill = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.user });
    if (user.userType != "admin") {
      return res.status(404).send({ message: "Unauthorized access" });
    }
    let billId = req.params.id;
    const billToBeApproved = await Bill.findById(billId);

    if (billToBeApproved.approved == true) {
      res.status(201).send({
        bill: billToBeApproved,
        message: "Bill already approved",
      });
    } else {
      billToBeApproved.approvedBy = user.id;
      billToBeApproved.approved = true;
      billToBeApproved.save();

      res.status(200).send({
        data: billToBeApproved,
        message: "Bill approved successfully",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error in approving bill",
      error: error.message,
    });
  }
};

module.exports.rejectBill = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.user });
    if (user.userType != "admin") {
      return res.status(404).send({ message: "Unauthorized access" });
    }
    let billId = req.params.id;
    const bill = await Bill.findById(billId);

    if (!bill.approved) {
      res.status(201).send({
        bill: bill,
        message: "Bill already rejected",
      });
    } else {
      bill.approvedBy = null;
      bill.approved = false;
      bill.save();

      res.status(200).send({
        data: bill,
        message: "Bill rejected successfully",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error in rejecting bill",
      error: error.message,
    });
  }
};

module.exports.exportBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    let downloadImages = req.params.downloadImages;
    let data = [];
    data.push(bill);
    let xlName = Date.now() + ".xlsx";
    let xlpath = path.join(__dirname, "../xlSheets", xlName);
    await makeXlsheet(data, xlpath);
    await archiveMaker(data, xlpath, res, downloadImages);
  } catch (error) {
    res.status(500).send({
      message: "Error in creating rar file",
      error: error.message,
    });
  }
};

module.exports.generateExcel = async (req, res) => {
  try {
    const allBills = await Bill.find().populate("approvedBy submittedBy");
    if (!allBills.length) {
      return res.status(201).send("No Bills to export!");
    }
    let _data = [];

    allBills.map((item) => {
      const { amount, submittedBy, approvedBy, approved, createdAt, billType } =
        item;

      const billObj = {
        id: submittedBy.employeeId || "",
        name: submittedBy.firstName.concat(" ", submittedBy?.lastName),
        amount: amount,
        type: billType,
        status: approved ? "Approved" : "Rejected",
        added: moment(createdAt).format("DD.MM.YYYY"),
        approvedBy: approved
          ? approvedBy.firstName.concat(" ", approvedBy?.lastName)
          : "",
      };

      _data.push(billObj);
    });

    // Generate the excel
    const generate = await GenerateBill(_data);

    if (generate.error)
      throw res.status(500).send("Something went wrong, Try again later");

    res.status(200).send(generate);

    console.log(generate);
  } catch (error) {
    console.log(error);
  }
};

module.exports.exportBillsBetweenDateRange = async (req, res) => {
  try {
    const { startDate, endDate, downloadImages, approvedBillStatus, billType } =
      req.body;
    let findQuery = {
      billDate: {
        $gte: new Date(startDate),
        $lt: new Date(endDate),
      },
    };
    if (billType.length > 0) {
      findQuery.billType = { $in: billType };
    }
    if (approvedBillStatus.length > 0) {
      findQuery.approved = { $in: approvedBillStatus };
    }

    const bills = await Bill.find(findQuery, {
      billPath: 0,
    });

    let xlName = Date.now() + ".xlsx";
    let xlpath = path.join(__dirname, "../xlSheets", xlName);
    await makeXlsheet(bills, xlpath);
    await archiveMaker(bills, xlpath, res, downloadImages);
  } catch (error) {
    res.status(500).send({
      message: "Error in creating rar file",
      error: error.message,
    });
  }
};

module.exports.getBillsBetweenDateRange = async (req, res) => {
  try {
    const { startDate, endDate, billType, approvedBillStatus } = req.query;
    let findQuery = {
      billDate: {
        $gte: new Date(JSON.parse(startDate)),
        $lt: new Date(JSON.parse(endDate)),
      },
    };

    if (billType?.length > 0) {
      findQuery.billType = { $in: billType };
    }

    if (approvedBillStatus?.length > 0) {
      findQuery.approved = { $in: approvedBillStatus };
    }

    const bills = await Bill.find(findQuery, {
      billPath: 0,
    }).populate("uploadedBy", {
      password: 0,
      bills: 0,
    });

    return res.status(200).send({
      data: bills,
      message: "Bills fetched successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error in finding records",
      error: error.message,
    });
  }
};

module.exports.getAllBills = async (req, res) => {
  try {
    let bills = await Bill.find({}).populate("uploadedBy");
    return res
      .status(200)
      .send({ data: bills, message: "Bills fetched successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ error: error.message, message: "Error in fetch Bills" });
  }
};
