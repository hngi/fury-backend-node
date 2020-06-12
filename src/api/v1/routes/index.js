import express from "express";
import { swaggerSpec } from "../../utils/swaggerSpec";
import employeesRouter from "./employees";

const router = express.Router();

// route for documentation in json
router.get("/documentation", (req, res) => {
  res.status(200).json(swaggerSpec);
});

// route to create an employees
router.use("/employees", employeesRouter);

export default router;
