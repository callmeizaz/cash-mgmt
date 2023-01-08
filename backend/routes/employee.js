const router = require("express").Router();
const employeeController = require("../controllers/employeeController");
const auth = require("../middleware/jwtAuth");

router.post("/add", employeeController.addEmployee);
router.get("/all", employeeController.getAllEmployees);
router.delete("/delete/:id", employeeController.deleteEmployeeById);
router.put("/update/:id", employeeController.updateEmployeeById);
router.get("/get/:id", employeeController.getEmployeeById);

module.exports = router;
