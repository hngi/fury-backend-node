import express from "express";
import { swaggerSpec } from "../../utils/swaggerSpec";

const router = express.Router();

// route for documentation in json
router.get("/documentation", (req, res) => {
  res.status(200).json(swaggerSpec);
});

export default router;
