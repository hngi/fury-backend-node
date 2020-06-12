import express from "express";
import { swaggerSpec } from "../../utils/swaggerSpec";
import responseHandler from "../../utils/responseHandler";
import { createEmployeeSchema, createDepartmentSchema } from '../../utils/validationRules'

import validationMiddleware from '../middleware/validationMiddleware';

import { createEmployee } from '../controllers/employeeController';
import { createDepartment } from '../controllers/departmentController';


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
router.post('/employees', validationMiddleware(createEmployeeSchema), createEmployee)

//department routes
router.post('/departments', validationMiddleware(createDepartmentSchema), createDepartment)
export default router;
