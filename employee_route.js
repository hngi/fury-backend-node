const controller = require("../controllers/employee_controller");
const router = require("express").Router();

// Create new  Employee details
router.post("/employees", controller.createEmployee)

//Updating Employee detail
router.put("/employee/employeeId", controller.updateEmployee)

module.exports = router;