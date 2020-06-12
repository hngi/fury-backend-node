import express from "express";
import employeesCtrl from "../../controllers/employeesController";

const employeesRouter = express.Router();

employeesRouter.post("/", employeesCtrl.createEmployee);

export default employeesRouter;
