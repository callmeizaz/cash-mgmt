const Employee = require("../models/Employee");

module.exports.addEmployee = async (req, res) => {
  try {
    let { email } = req.body;
    const existingUser = await Employee.findOne({ email: email });
    if (existingUser)
      return res
        .status(500)
        .send({ msg: "An account with this email already exists." });

    let employee = await Employee.create(req.body);
    return res
      .status(200)
      .send({ data: employee, messgae: "Employee created successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ error: error.message, message: "Error in adding employee" });
  }
};

module.exports.getAllEmployees = async (req, res) => {
  try {
    let employees = await Employee.find({});
    return res
      .status(200)
      .send({ data: employees, message: "Employees fetched successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ error: error.message, message: "Error in adding employee" });
  }
};
module.exports.deleteEmployeeById = async (req, res) => {
  console.log(req.params);
  try {
    let employee = await Employee.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .send({ data: employee, message: "Employee deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ error: error.message, message: "Error in deleting employee" });
  }
};

module.exports.updateEmployeeById = async (req, res) => {
  try {
    let employee = await Employee.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    return res
      .status(200)
      .send({ data: employee, message: "Employee updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ error: error.message, message: "Error in updating employee" });
  }
};

module.exports.getEmployeeById = async (req, res) => {
  try {
    let employee = await Employee.findOne({ _id: req.params.id });
    return res
      .status(200)
      .send({ data: employee, message: "Employee found successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ error: error.message, message: "Error in finding employee" });
  }
};
