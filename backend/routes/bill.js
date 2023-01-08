const router = require("express").Router();
const auth = require("../middleware/jwtAuth");
const path = require("path");
const multer = require("multer");
const billController = require("../controllers/billController");
const BILL_PATH = path.join("/uploads/users/bills");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", BILL_PATH));
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

var upload = multer({ storage: storage }).single("bill");

router.get("/export", billController.generateExcel);
router.post("/add", [auth, upload], billController.addBill);
router.post(
  "/exportMultiple",
  auth,
  billController.exportBillsBetweenDateRange
);
router.get("/getFilteredBills", auth, billController.getBillsBetweenDateRange);

router.get("/getBills", auth, billController.getAllBills);
router.post("/delete/:id", auth, billController.deleteBill);
router.post("/update/:id", [auth, upload], billController.updateBill);
router.get("/get/:id", auth, billController.getBillById);
router.get("/export/:id", auth, billController.exportBill);
router.put("/approve/:id", auth, billController.approveBill);
router.put("/reject/:id", auth, billController.rejectBill);

module.exports = router;
