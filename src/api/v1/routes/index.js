import express from "express";
import { swaggerSpec } from "../../utils/swaggerSpec";
import responseHandler from "../../utils/responseHandler";
import {
  createEmployeeSchema,
  createDepartmentSchema,
  updateDepartmentSchema,
  updateEmployeeSchema,
} from "../../utils/validationRules";

import validationMiddleware from "../middleware/validationMiddleware";

import {
  createEmployee,
  deleteEmployee,
  getSingleEmployee,
  getAllEmployees,
  updateEmployee,
} from "../controllers/employeeController";
import {
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getSingleDepartment,
  getAllDepartments,
} from "../controllers/departmentController";

const router = express.Router();

// route for documentation in json
router.get("/documentation", (req, res) => {
  res.status(200).json(swaggerSpec);
});

// route for configuration
router.get("/configuration", (req, res) => {
  responseHandler(res, 200, {
    message: "configuration received",
  });
});

// employees routes
router.post(
  "/employees",
  validationMiddleware(createEmployeeSchema),
  createEmployee
);
router.put(
  "/employees/:employeeId",
  validationMiddleware(updateEmployeeSchema),
  updateEmployee
)
router.delete("/employees/:employeeId", deleteEmployee);
router.get("/employees/:employeeId", getSingleEmployee);
router.get("/employees", getAllEmployees);

// departments routes
router.post(
  "/departments",
  validationMiddleware(createDepartmentSchema),
  createDepartment
);
router.put(
  "/departments/:departmentId",
  validationMiddleware(updateDepartmentSchema),
  updateDepartment
);
router.delete("/departments/:departmentId", deleteDepartment);
router.get("/departments/:departmentId", getSingleDepartment);
router.get("/departments", getAllDepartments);

export default router;
