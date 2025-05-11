import { Router } from "express";
import {
  submitScan,
  getScanHistory,
  deleteScan,
  validateUser,
  validatePlantDataSchema,
  validateScanId,
} from "../controllers/scanController";
import validateRequest from "../middleware/validateRequest";
import verifyToken from "middleware/verifyToken";

const scanRouter = Router();

scanRouter.post(
  "/scan",
  verifyToken,
  validateUser,
  validatePlantDataSchema,
  validateRequest,
  submitScan
);

scanRouter.get(
  "/scans",
  verifyToken,
  validateUser,
  validateRequest,
  getScanHistory
);

scanRouter.delete(
  "/scan/:scanId",
  verifyToken,
  validateScanId,
  validateRequest,
  deleteScan
);

export default scanRouter;
