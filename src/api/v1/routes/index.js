import express from "express";
import { swaggerSpec } from "../../utils/swagger-spec";

const router = express.Router();

// documentation in json
router.get("/documentation", (req, res) => {
  res.status(200).json(swaggerSpec);
});

export default router;
