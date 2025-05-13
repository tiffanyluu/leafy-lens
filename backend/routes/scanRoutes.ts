import { Router } from "express";
import {
  submitScan,
  getScanHistory,
  deleteScan,
  validateScanId,
} from "../controllers/scanController";
import validateRequest from "../middleware/validateRequest";
import verifyToken from "../middleware/verifyToken";

const scanRouter = Router();

scanRouter.post("/scans", verifyToken, validateRequest, submitScan);

scanRouter.get("/scans", verifyToken, validateRequest, getScanHistory);

scanRouter.delete(
  "/scan/:scanId",
  verifyToken,
  validateScanId,
  validateRequest,
  deleteScan
);

export default scanRouter;
