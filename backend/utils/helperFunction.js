const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");

module.exports.GenerateBill = async (data) => {
  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet("bill");

  const filePath = path.join(__dirname, "..", "/files");
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }

  worksheet.columns = [
    { header: "EmployeeId", key: "id", width: 10 },
    { header: "Employee Name", key: "name", width: 15 },
    { header: "Amount", key: "amount", width: 15 },
    { header: "Type", key: "type", width: 15 },
    { header: "Status", key: "status", width: 15 },
    { header: "Added", key: "added", width: 15 },
    { header: "Approved By", key: "approvedBy", width: 20 },
  ];

  data.forEach((bill) => {
    worksheet.addRow(bill);
  });

  //   Making first line bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });

  try {
    await workbook.xlsx.writeFile(`${filePath}/${Date.now()}.xlsx`);

    return {
      error: null,
      message: "Successfully exported bills",
      path: `${filePath}/${Date.now()}.xlsx`,
    };
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
      path: `${filePath}/${Date.now()}.xlsx`,
    };
  }
};
