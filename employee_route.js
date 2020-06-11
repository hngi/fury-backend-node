const controller = require("../controllers/employee_controller");
const router = require("express").Router();

// All Employee details
router.post("/employees", controller.AllEmployee)

module.exports = router;